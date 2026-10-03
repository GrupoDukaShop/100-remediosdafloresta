import Link from "next/link";
import { notFound } from "next/navigation";
import artigos from "@/data/artigos-saude-natural.json";
import SiteFooter from "@/components/SiteFooter";
import CheckoutLink from "@/components/CheckoutLink";

export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const artigo = artigos.find((a) => a.slug === params.slug);
  if (!artigo) return {};
  return {
    title: `${artigo.titulo} — Blog Sabedoria Natural`,
    description: artigo.resumo,
  };
}

export default function ArtigoPage({ params }) {
  const index = artigos.findIndex((a) => a.slug === params.slug);
  if (index === -1) return notFound();
  const artigo = artigos[index];
  const prev = artigos[index - 1];
  const next = artigos[index + 1];

  return (
    <>
      <section className="post-hero">
        <div className="container-narrow">
          <p className="post-breadcrumb">
            <Link href="/blog">Blog</Link> / <Link href="/blog/saude-natural">Saúde Natural</Link>
          </p>
          <span className="post-cat-pill">Saúde Natural</span>
          <h1 className="post-title">{artigo.titulo}</h1>
        </div>
      </section>

      <section className="post-body">
        <div className="container-narrow">
          <div className="post-text">
            {artigo.corpo.map((par, i) => (
              <p key={i}>{par}</p>
            ))}
          </div>

          <div className="post-cta-box">
            <p>{artigo.cta}</p>
            <CheckoutLink
              className="btn-cta"
              trackingId="health-article-checkout"
              trackingLabel="Quero acessar os 2 guias completos"
            >
              Quero acessar os 2 guias completos
            </CheckoutLink>
          </div>

          <div className="post-nav">
            {prev ? (
              <Link href={`/blog/saude-natural/${prev.slug}`}>← {prev.titulo}</Link>
            ) : <span />}
            {next ? (
              <Link href={`/blog/saude-natural/${next.slug}`} style={{ textAlign: "right" }}>{next.titulo} →</Link>
            ) : <span />}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
