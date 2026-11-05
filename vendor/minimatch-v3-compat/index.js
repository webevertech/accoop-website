'use strict';

/**
 * minimatch@3 API on top of the patched minimatch@11 engine.
 *
 * Why: GHSA-g3hv-75wg-m249 / CVE-2026-118764 (globparts amplification DoS) is only fixed in
 * minimatch >= 11.0.1, but eslint-plugin-import, eslint-plugin-jsx-a11y and eslint-plugin-react
 * still pin minimatch ^3 and call its default export as a function — which minimatch@11 no
 * longer has. package.json "overrides" points those plugins at this shim.
 *
 * The override spec is "file:../../vendor/minimatch-v3-compat" because npm resolves file: specs
 * in overrides relative to the *dependent* package (node_modules/<plugin>/), not the repo root —
 * "file:./vendor/..." and "$minimatch-v3-compat" both produce broken links. This relies on the
 * three plugins being hoisted to top-level node_modules (they are).
 *
 * Remove this package (and its overrides) once those plugins depend on minimatch >= 11.0.1.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS on purpose: consumers require() this shim
const mm = require('minimatch');

function minimatch(path, pattern, options) {
  return mm.minimatch(path, pattern, options);
}

// v3 exposed its helpers as properties of the default function.
Object.assign(minimatch, mm);
minimatch.default = minimatch;

module.exports = minimatch;
