import { DownloadButton } from "./DownloadButton";
import { InngestWordmark } from "./InngestWordmark";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-carbon-900 py-12 print-hide">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <InngestWordmark className="mb-2 text-carbon-50" />
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-carbon-500">
            Durable execution for modern product and AI workflows.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <DownloadButton variant="ghost">Download PDF</DownloadButton>
          <div className="font-mono text-xs text-carbon-600">
            © {new Date().getFullYear()} Inngest, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
}
