import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-background px-8 py-10">
    <div className="mx-auto flex max-w-6xl flex-wrap gap-16">
      <div className="min-w-[200px]">
        <p className="font-display text-sm font-bold italic text-primary">SONIC EDITORIAL</p>
        <p className="mt-2 max-w-xs text-xs text-muted-foreground">
          The High-Fidelity Gallery. Curation for the discerning listener. Archiving the future of sound.
        </p>
        <p className="mt-4 text-[10px] text-muted-foreground">© 2024 SONIC EDITORIAL. THE HIGH-FIDELITY GALLERY.</p>
      </div>
      <div>
        <p className="sonic-label mb-3 text-primary">Archive</p>
        <div className="flex flex-col gap-2">
          {["About", "Pro", "Privacy"].map((l) => (
            <Link key={l} to="#" className="text-xs text-muted-foreground hover:text-foreground">{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <p className="sonic-label mb-3 text-primary">Support</p>
        <div className="flex flex-col gap-2">
          {["Terms", "API", "Help"].map((l) => (
            <Link key={l} to="#" className="text-xs text-muted-foreground hover:text-foreground">{l}</Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
