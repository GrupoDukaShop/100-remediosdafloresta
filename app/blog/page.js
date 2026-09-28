import Link from "next/link";
import artigos from "@/data/artigos-saude-natural.json";
import capitulos from "@/data/capitulos-remedios.json";
import remedios from "@/data/remedios.json";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Blog — Kit Sabedoria Natural",
  description:
    "Artigos sobre saúde natural e remédios tradicionais indígenas: ervas, chás, óleos essenciais e a sabedoria da floresta brasileira.",
};

export default function BlogHome() {
  const artigosDestaque = artigos.slice(0, 3);
  const remediosDestaque = remedios.slice(0, 6);

  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <h1>Blog Sabedoria Natural</h1>
          <p>
            Artigos sobre saúde natural do dia a dia e os 100 remédios tradicionais
            dos povos da floresta brasileira — direto dos nossos dois guias completos.
          </p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="blog-section-head">
            <h2>Saúde Natural do Dia a Dia</h2>
            <Link href="/blog/saude-natural">Ver todos os artigos →</Link>
          </div>
          <div className="article-grid">
            {artigosDestaque.map((a) => (
              <Link key={a.slug} href={`/blog/saude-natural/${a.slug}`} className="article-card">
                <span className="cat-pill">Saúde Natural</span>
                <h3>{a.titulo}</h3>
                <p>{a.resumo}</p>
                <span className="read-more">Ler artigo →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section alt">
        <div className="container">
          <div className="blog-section-head">
            <h2>100 Remédios da Floresta</h2>
            <Link href="/blog/remedios">Ver todas as categorias →</Link>
          </div>
          <div className="article-grid">
            {remediosDestaque.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/remedios/${r.capituloId}/${r.slug}`}
                className="article-card"
              >
                <span className="cat-pill">{r.capitulo}</span>
                <h3>{r.nome}</h3>
                <p>{r.uso}</p>
                <span className="read-more">Ver remédio →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="blog-section-head">
            <h2>Categorias de Remédios</h2>
          </div>
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
