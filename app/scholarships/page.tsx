import Link from "next/link";
import { ArrowLeft, Search, ShieldCheck } from "lucide-react";

type Props = { searchParams: Promise<{ q?: string; level?: string; provider?: string }> };

export default async function ScholarshipsPage({ searchParams }: Props) {
  const params = await searchParams;
  const term = params.q || "";
  const level = params.level || "";
  const provider = params.provider || "";
  const heading = term ? `Search: “${term}”` : level || provider || "Explore scholarships";

  return (
    <main className="search-page">
      <header className="search-page-nav">
        <Link href="/" className="brand"><span className="brand-mark">✳</span><span>scholar<span className="brand-accent">sphere</span><i>.</i></span></Link>
        <Link href="/" className="back-link"><ArrowLeft size={16}/> Back to home</Link>
      </header>
      <section className="search-page-content">
        <div className="eyebrow dark-eyebrow">SCHOLARSHIP DISCOVERY</div>
        <h1>{heading}</h1>
        <p className="search-page-lede">Your search has been received. We’re building a verified, India-wide scholarship directory, with every listing checked against its official provider source.</p>
        <div className="search-state-card">
          <div className="search-state-icon"><Search size={25}/></div>
          <div><h2>The directory is coming together.</h2><p>We haven’t published verified scholarship listings here yet. We won’t fill this page with made-up awards, amounts or deadlines.</p></div>
        </div>
        <div className="search-trust"><ShieldCheck size={18}/><span>ScholarSphere will link you to the official provider to complete an application. We do not collect application documents or submit applications.</span></div>
        <Link href="/" className="search-home-button">Explore how ScholarSphere works <ArrowLeft size={16}/></Link>
      </section>
    </main>
  );
}
