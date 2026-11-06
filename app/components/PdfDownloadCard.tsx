import Image from 'next/image';
import { Download } from 'lucide-react';

export interface Downloadable {
  /** File in public/downloads/. Served same-origin so the `download` attribute is honoured. */
  href: string;
  /** Name the browser saves the file as. */
  fileName: string;
  /** First-page render in public/downloads/covers/ (640×829). Regenerate if the PDF changes. */
  cover: string;
  kicker: string;
  title: string;
  pages: number;
  size: string;
}

/**
 * A PDF shown as its first page. Hover (or keyboard focus) reveals a download icon; clicking
 * downloads the file. The caption repeats "PDF · pages · size" so touch users, who can't hover,
 * still see that it's a download.
 */
export default function PdfDownloadCard({ doc }: { doc: Downloadable }) {
  return (
    <a
      href={doc.href}
      download={doc.fileName}
      className="group block rounded-xl"
      data-track="pdf-download"
      data-file={doc.fileName}
    >
      <div className="relative overflow-hidden rounded-xl bg-cream shadow-lg ring-1 ring-black/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-focus-visible:-translate-y-1 group-focus-visible:shadow-2xl">
        <Image src={doc.cover} alt="" width={640} height={829} className="h-auto w-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary-dark/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="flex h-16 w-16 scale-90 items-center justify-center rounded-full bg-white text-primary shadow-xl transition-transform duration-300 group-hover:scale-100 group-focus-visible:scale-100">
            <Download className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="font-heading font-semibold text-white">Download PDF</span>
        </div>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-primary">{doc.kicker}</p>
      <h3 className="mt-1 font-heading text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        {doc.title}
      </h3>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground/60">
        <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
        PDF · {doc.pages} pages · {doc.size}
      </p>
    </a>
  );
}
