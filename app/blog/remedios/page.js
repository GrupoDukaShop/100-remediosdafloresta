import Link from "next/link";
import capitulos from "@/data/capitulos-remedios.json";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "100 Remédios da Floresta — Categorias",
  description: "Os 100 remédios tradicionais indígenas organizados em 10 categorias temáticas.",
};

export default function RemediosIndex() {
  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <p className="post-breadcrumb"><Link href="/blog">← Voltar para o blog</Link></p>
          <h1>100 Remédios da Floresta</h1>
          <p>Os 100 remédios tradicionais indígenas, organizados em 10 categorias — escolha uma para explorar.</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="category-grid">
            {capitulos.map((c, i) => (
              <Link key={c.id} href={`/blog/remedios/${c.id}`} className="category-card">
                <span className="cat-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.intro}</p>
                <span className="cat-count">{c.count} remédios</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
