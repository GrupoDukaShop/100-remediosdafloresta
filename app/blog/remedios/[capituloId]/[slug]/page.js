import Link from "next/link";
import { notFound } from "next/navigation";
import capitulos from "@/data/capitulos-remedios.json";
import remedios from "@/data/remedios.json";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return remedios.map((r) => ({ capituloId: r.capituloId, slug: r.slug }));
}

export function generateMetadata({ params }) {
  const r = remedios.find((x) => x.slug === params.slug && x.capituloId === params.capituloId);
  if (!r) return {};
  return {
    title: `${r.nome} — Remédio Natural Indígena Nº ${r.n}`,
    description: r.uso,
  };
}

export default function RemedioPage({ params }) {
  const cap = capitulos.find((c) => c.id === params.capituloId);
  const itemsInCap = remedios.filter((x) => x.capituloId === params.capituloId);
  const index = itemsInCap.findIndex((x) => x.slug === params.slug);
  if (!cap || index === -1) return notFound();

  const r = itemsInCap[index];
  const prev = itemsInCap[index - 1];
  const next = itemsInCap[index + 1];

  return (
    <>
      <section className="post-hero">
        <div className="container-narrow">
          <p className="post-breadcrumb">
            <Link href="/blog">Blog</Link> / <Link href="/blog/remedios">100 Remédios</Link> /{" "}
            <Link href={`/blog/remedios/${cap.id}`}>{cap.title}</Link>
          </p>
          <span className="post-cat-pill">Remédio Nº {String(r.n).padStart(3, "0")}</span>
          <h1 className="post-title">{r.nome}</h1>
          {r.cientifico && <p className="post-cient">{r.cientifico}</p>}
        </div>
      </section>

      <section className="post-body">
        <div className="container-narrow">
          <div className="post-meta-grid">
            <div className="post-meta-box">
              <span className="label">Parte Usada</span>
              <p>{r.parte}</p>
            </div>
            <div className="post-meta-box">
              <span className="label">Modo de Preparo</span>
              <p>{r.preparo}</p>
            </div>
          </div>

          <h2 className="post-section-title">Uso Tradicional</h2>
          <div className="post-text">
            <p>{r.uso}</p>
          </div>

          {r.aviso && (
            <div className="post-warning">
              <strong>Atenção:</strong> {r.aviso}
            </div>
          )}

          <div className="post-cta-box">
            <p>
              Este é apenas 1 dos 100 remédios tradicionais reunidos no ebook{" "}
              <strong>100 Remédios da Floresta</strong>, organizados por finalidade e
              prontos para consulta rápida.
            </p>
            <a href="/#oferta" className="btn-cta">Quero o Ebook Completo por R$ 9</a>
          </div>

          <div className="post-nav">
            {prev ? (
              <Link href={`/blog/remedios/${cap.id}/${prev.slug}`}>← {prev.nome}</Link>
            ) : <span />}
            {next ? (
              <Link href={`/blog/remedios/${cap.id}/${next.slug}`} style={{ textAlign: "right" }}>{next.nome} →</Link>
            ) : <span />}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
