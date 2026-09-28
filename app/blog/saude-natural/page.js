import Link from "next/link";
import artigos from "@/data/artigos-saude-natural.json";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Saúde Natural do Dia a Dia — Blog",
  description: "10 artigos práticos de saúde natural: nutrição, ervas, óleos essenciais, mente-corpo e prevenção.",
};

export default function SaudeNaturalIndex() {
  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <p className="post-breadcrumb"><Link href="/blog">← Voltar para o blog</Link></p>
          <h1>Saúde Natural do Dia a Dia</h1>
          <p>10 artigos baseados no ebook Saúde Sem Remédio, para colocar a saúde natural em prática hoje mesmo.</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="article-grid">
            {artigos.map((a) => (
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

      <SiteFooter />
    </>
  );
}
