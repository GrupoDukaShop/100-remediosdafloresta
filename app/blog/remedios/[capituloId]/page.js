import Link from "next/link";
import { notFound } from "next/navigation";
import capitulos from "@/data/capitulos-remedios.json";
import remedios from "@/data/remedios.json";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return capitulos.map((c) => ({ capituloId: c.id }));
}

export function generateMetadata({ params }) {
  const cap = capitulos.find((c) => c.id === params.capituloId);
  if (!cap) return {};
  return {
    title: `${cap.title} — 100 Remédios da Floresta`,
    description: cap.intro,
  };
}

export default function CategoriaPage({ params }) {
  const cap = capitulos.find((c) => c.id === params.capituloId);
  if (!cap) return notFound();
  const items = remedios.filter((r) => r.capituloId === params.capituloId);

  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <p className="post-breadcrumb">
            <Link href="/blog">Blog</Link> / <Link href="/blog/remedios">100 Remédios da Floresta</Link>
          </p>
          <h1>{cap.title}</h1>
          <p>{cap.intro}</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="remedy-list">
            {items.map((r) => (
              <Link key={r.slug} href={`/blog/remedios/${cap.id}/${r.slug}`} className="remedy-list-item">
                <span className="rl-num">{String(r.n).padStart(2, "0")}</span>
                <span>
                  <span className="rl-name">{r.nome}</span>
                  {r.cientifico && <span className="rl-cient">{r.cientifico}</span>}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
