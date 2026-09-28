import Link from "next/link";

export default function SiteHeader() {
  return (
    <div className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo">
          🌿 Kit Sabedoria Natural
        </Link>
        <nav className="site-nav">
          <Link href="/blog">Blog</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/#oferta" className="site-nav-cta">Comprar</Link>
        </nav>
      </div>
    </div>
  );
}
