import PdfDownloadCard, { type Downloadable } from './PdfDownloadCard';

/**
 * The two state reports are verbatim copies of the PDFs linked by the QR codes in the project
 * brief (page 3), hosted here because browsers ignore `download` on cross-origin links:
 *   https://www.nj.gov/dca/images/library/stories/A.C.report_9.20.18.pdf
 *   https://www.nj.gov/dca/images/library/stories/ACRRWG-MAY-2021-Report.pdf
 */
const DOWNLOADS: Downloadable[] = [
  {
    href: '/downloads/accoop-project-brief.pdf',
    fileName: 'AC-Coop-Project-Brief-July-2026.pdf',
    cover: '/downloads/covers/accoop-project-brief.webp',
    kicker: 'Project Brief · July 2026',
    title: 'City Owned. City Built. City Powered.',
    pages: 20,
    size: '8.1 MB',
  },
  {
    href: '/downloads/atlantic-city-shared-prosperity-report-2018.pdf',
    fileName: 'Atlantic-City-Shared-Prosperity-Report-2018.pdf',
    cover: '/downloads/covers/atlantic-city-shared-prosperity-report-2018.webp',
    kicker: 'Report to the Governor · 2018',
    title: 'Atlantic City: Building a Foundation for Shared Prosperity',
    pages: 64,
    size: '8.8 MB',
  },
  {
    href: '/downloads/atlantic-city-restart-recovery-report-2021.pdf',
    fileName: 'Atlantic-City-Restart-Recovery-Report-2021.pdf',
    cover: '/downloads/covers/atlantic-city-restart-recovery-report-2021.webp',
    kicker: 'Report to the Governor · May 2021',
    title: 'Atlantic City Restart & Recovery Working Group',
    pages: 58,
    size: '2.3 MB',
  },
];

export default function LearnMoreDownloads() {
  return (
    <section className="bg-white py-20" aria-labelledby="learn-more-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            id="learn-more-heading"
            className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
          >
            Learn More About Atlantic City Co-op
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Download our project brief and the two Atlantic City reports it puts into action.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {DOWNLOADS.map((doc) => (
            <li key={doc.href} className="mx-auto w-full max-w-72 sm:max-w-none">
              <PdfDownloadCard doc={doc} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
