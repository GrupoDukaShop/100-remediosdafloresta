import Link from "next/link";
import CheckoutLink from "./CheckoutLink";

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
          <CheckoutLink
            className="site-nav-cta"
            trackingId="header-checkout"
            trackingLabel="Quero acessar os guias"
          >
            Quero acessar
          </CheckoutLink>
        </nav>
      </div>
    </div>
  );
}
