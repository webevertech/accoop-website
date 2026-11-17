// E2E: the member / sponsor registration forms are locked to Atlantic City, NJ.
//
// Business rule (docs/prds/atlantic-city-locked-location.md): Country, State, City, Zip Code and County are
// pre-filled and disabled — United States / New Jersey / Atlantic City / 08401 / Atlantic County.
//
// The location and registration APIs are mocked with realistic fixtures, so this spec needs no backend.
// It is plain .mjs on purpose: tsconfig includes **/*.ts, and @playwright/test is not a repo dependency yet
// (see the "Running" section of the doc above) — a .ts spec would break `next build`.
import { test, expect } from '@playwright/test';

const LOCKED = {
  country: 'United States',
  state: 'New Jersey',
  city: 'Atlantic City',
  zip: '08401',
  county: 'Atlantic County',
};

/** Shaped like the real OneConnect360 responses. IDs differ per environment, so the form must match by name. */
const CITIES_NJ = [
  { id: 590, name: 'Newark' },
  { id: 596, name: 'Atlantic Highlands' }, // must NOT be picked (name merely starts with "Atlantic")
  { id: 597, name: 'Atlantic City' },
];
const COUNTIES_NJ = [
  { id: 5, name: 'Bergen County' },
  { id: 7, name: 'Atlantic County' }, // the API says "Atlantic County"; the rule says "Atlantic"
];
const ZIPS_ATLANTIC_CITY = [
  { id: 166, zip_code: '08401' },
  { id: 167, zip_code: '08404' }, // allowed by the backend, but the form must pin 08401 only
  { id: 168, zip_code: '08405' },
];

async function mockApis(page, { cities = CITIES_NJ } = {}) {
  const posts = [];
  await page.route('**/api/location/**', async (route) => {
    const url = new URL(route.request().url());
    const p = url.pathname;
    let data = [];
    if (p.endsWith('/countries')) data = [{ id: 106, name: 'United States' }, { id: 38, name: 'Canada' }];
    else if (p.endsWith('/states')) data = [{ id: 30, name: 'New Jersey' }, { id: 31, name: 'New York' }];
    else if (p.endsWith('/counties')) data = COUNTIES_NJ;
    else if (p.endsWith('/cities')) data = cities;
    else if (p.endsWith('/zip-codes')) data = url.searchParams.get('city_id') === '597' ? ZIPS_ATLANTIC_CITY : [];
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data }) });
  });
  await page.route(/\/api\/(customers|partners)\/register$/, async (route) => {
    posts.push({ url: route.request().url(), body: route.request().postData() || '' });
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"message":"ok"}' });
  });
  return posts;
}

const dialog = (page) => page.getByRole('dialog');

async function openForm(page, path, buttonName) {
  await page.goto(path);
  await page.getByRole('button', { name: buttonName }).first().click();
  await expect(dialog(page)).toBeVisible();
}

async function expectLocked(page, zipId = 'zip') {
  const dlg = dialog(page);
  const ids = { country: 'country', state: 'state', city: 'city', zip: zipId, county: 'county' };
  for (const [key, id] of Object.entries(ids)) {
    const field = dlg.locator(`#${id}`);
    await expect(field, `${key} is locked`).toBeDisabled();
    await expect(field, `${key} value`).toHaveText(LOCKED[key]);
  }
  // A locked field never opens its option list, so no other city / zip / county can be chosen.
  for (const id of ['city', zipId, 'county']) {
    await dlg.locator(`#${id}`).click({ force: true, timeout: 2000 }).catch(() => {});
    await expect(dlg.getByRole('listbox')).toHaveCount(0);
  }
}

async function pickDateOfBirth(page) {
  await dialog(page).locator('#dateOfBirth').click();
  const selects = dialog(page).locator('select');
  await selects.nth(0).selectOption({ index: 5 });
  await selects.nth(1).selectOption('1990');
  await dialog(page).getByRole('button', { name: /^15$/ }).first().click();
}

test.describe('Atlantic City locked location', () => {
  test('"Become a Member" form pre-fills and locks the five location fields', async ({ page }) => {
    await mockApis(page);
    await openForm(page, '/', 'Become a Member');
    await expect(page.locator('#form-modal-title')).toHaveText('Become a Member');
    await expectLocked(page);
  });

  test('"Join the Co-Op" form pre-fills and locks the five location fields', async ({ page }) => {
    await mockApis(page);
    await openForm(page, '/', 'Join the Co-Op');
    await expect(page.locator('#form-modal-title')).toHaveText('Join the Co-Op');
    await expectLocked(page);
  });

  test('member registration submits the Atlantic City / 08401 / Atlantic County IDs', async ({ page }) => {
    const posts = await mockApis(page);
    await openForm(page, '/', 'Become a Member');
    await expectLocked(page);

    const dlg = dialog(page);
    await dlg.locator('#email').fill('locked.check@example.com');
    await dlg.locator('#confirmEmail').fill('locked.check@example.com');
    await dlg.locator('#password').fill('Passw0rd!x');
    await dlg.locator('#confirmPassword').fill('Passw0rd!x');
    await dlg.locator('#firstName').fill('Locked');
    await dlg.locator('#lastName').fill('Check');
    await dlg.locator('#address').fill('1 Boardwalk');
    await dlg.locator('#phone').fill('6095550100');
    await pickDateOfBirth(page);
    await dlg.locator('#gender').click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();
    await dlg.locator('#preferredLanguage').click();
    await page.getByRole('option', { name: 'English' }).click();
    await dlg.locator('input[type=checkbox]').check();
    await dlg.locator('button[type=submit]').click();

    await expect(dlg).toContainText("You're all set");
    const body = JSON.parse(posts.find((p) => p.url.endsWith('/api/customers/register')).body);
    expect(body).toMatchObject({
      country_id: '106',
      state_id: '30',
      county_id: '7', // "Atlantic County", not Bergen
      city_id: '597', // "Atlantic City", not "Atlantic Highlands"
      zip_code: '08401', // not 08404 / 08405
    });
  });

  test('Corporate / Sponsor mode of the Join form is locked too and submits the same IDs', async ({ page }) => {
    const posts = await mockApis(page);
    await openForm(page, '/', 'Join the Co-Op');
    await dialog(page).locator('#membershipType').click();
    await page.getByRole('option', { name: /Corporate/ }).click();
    await expectLocked(page);

    const dlg = dialog(page);
    await dlg.locator('#firstName').fill('Vend');
    await dlg.locator('#lastName').fill('Or');
    await dlg.locator('#phone').fill('6095550101');
    await dlg.locator('#email').fill('vendor.check@example.com');
    await dlg.locator('#organizationName').fill('Locked Org');
    await dlg.locator('#organizationStreetAddress').fill('2 Pacific Ave');
    await dlg.locator('#displayAddress').fill('2 Pacific Ave, Atlantic City');
    await dlg.locator('input[type=checkbox]').check();
    await dlg.locator('button[type=submit]').click();

    await expect(dlg).toContainText('Thank you');
    const raw = posts.find((p) => p.url.endsWith('/api/partners/register')).body;
    const field = (name) => new RegExp(`name="${name}"\\r?\\n\\r?\\n([^\\r\\n]*)`).exec(raw)?.[1];
    expect({ state: field('state_id'), county: field('county_id'), city: field('city_id'), zip: field('zip_code') })
      .toEqual({ state: '30', county: '7', city: '597', zip: '08401' });
  });

  test('"Become a Vendor" form is locked and submits the same IDs', async ({ page }) => {
    const posts = await mockApis(page);
    await openForm(page, '/', 'Become a Vendor');
    await expect(page.locator('#form-modal-title')).toHaveText('Become a Vendor');
    await expectLocked(page);

    const dlg = dialog(page);
    await dlg.locator('#firstName').fill('Vend');
    await dlg.locator('#lastName').fill('Or');
    await dlg.locator('#phone').fill('6095550102');
    await dlg.locator('#email').fill('vendor.form@example.com');
    await dlg.locator('#organizationName').fill('Locked Vendor Org');
    await dlg.locator('#organizationStreetAddress').fill('3 Atlantic Ave');
    await dlg.locator('#displayAddress').fill('3 Atlantic Ave, Atlantic City');
    await dlg.locator('button[type=submit]').click();

    await expect(dlg).toContainText('Thank you');
    const raw = posts.find((p) => p.url.endsWith('/api/partners/register')).body;
    const field = (name) => new RegExp(`name="${name}"\\r?\\n\\r?\\n([^\\r\\n]*)`).exec(raw)?.[1];
    expect({ state: field('state_id'), county: field('county_id'), city: field('city_id'), zip: field('zip_code') })
      .toEqual({ state: '30', county: '7', city: '597', zip: '08401' });
  });

  test('Sponsor form is locked in both Corporate and member mode', async ({ page }) => {
    await mockApis(page);
    await openForm(page, '/about', 'Sponsor the Co-Op');
    await expectLocked(page, 'zip'); // Corporate / Sponsor mode (default)

    await dialog(page).locator('#membershipType').click();
    await page.getByRole('option', { name: /Patron/ }).click();
    await expectLocked(page, 'postalCode'); // member mode uses #postalCode
  });

  test('if the API has no "Atlantic City" the fields stay empty and submit reports them as required', async ({ page }) => {
    await mockApis(page, { cities: [{ id: 590, name: 'Newark' }] });
    await openForm(page, '/', 'Become a Member');
    const dlg = dialog(page);
    await expect(dlg.locator('#state')).toHaveText(LOCKED.state);
    await expect(dlg.locator('#city')).toBeDisabled();
    await expect(dlg.locator('#city')).toHaveText('Select city');
    await expect(dlg.locator('#zip')).toHaveText('Select zip code');

    await dlg.locator('input[type=checkbox]').check();
    await dlg.locator('button[type=submit]').click();
    await expect(dlg).toContainText('City is required.');
    await expect(dlg).toContainText('Zip code is required.');
  });
});
