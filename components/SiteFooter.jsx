import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="page-footer">
      <div className="container">
        <p className="footer-heading">Kit Sabedoria Natural</p>
        <p className="footer-muted">
          Saúde Sem Remédio + 100 Remédios da Floresta. Todos os direitos reservados.
        </p>
        <p className="footer-muted" style={{ marginTop: "0.75rem" }}>
          <Link href="/blog" className="footer-link">Blog</Link>
          {"  •  "}
          <Link href="/sobre" className="footer-link">Sobre</Link>
          {"  •  "}
          <Link href="/politica-de-privacidade" className="footer-link">Política de Privacidade</Link>
        </p>
        <div className="footer-disclaimer">
          Este material tem caráter educativo, cultural e informativo sobre práticas
          tradicionais de saúde natural e etnobotânica popular brasileira. Ele não
          substitui consultas, diagnósticos ou tratamentos indicados por médicos e
          profissionais de saúde. O conhecimento tradicional reunido no ebook 100
          Remédios da Floresta pertence, antes de tudo, aos povos indígenas
          brasileiros que o desenvolveram e o transmitiram por gerações — este
          material busca divulgá-lo com respeito.
        </div>
      </div>
    </footer>
  );
}
