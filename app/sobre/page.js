import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Sobre — Kit Sabedoria Natural",
  description: "Conheça o Kit Sabedoria Natural: Saúde Sem Remédio + 100 Remédios da Floresta.",
};

export default function SobrePage() {
  return (
    <>
      <section className="static-page">
        <div className="container-narrow">
          <h1>Sobre o Kit Sabedoria Natural</h1>

          <p>
            O Kit Sabedoria Natural nasceu da vontade de reunir, num só lugar, dois
            caminhos complementares de cuidado natural: os hábitos práticos de saúde
            do dia a dia e a sabedoria ancestral dos povos indígenas brasileiros sobre
            plantas medicinais.
          </p>

          <p>
            Nosso primeiro ebook, <strong>Saúde Sem Remédio</strong>, reúne nutrição,
            fitoterapia, óleos essenciais, equilíbrio mente-corpo e prevenção em 10
            capítulos práticos, pensados para quem quer resultados reais no dia a dia.
          </p>

          <p>
            Nosso segundo ebook, <strong>100 Remédios da Floresta</strong>, é uma
            compilação cuidadosa de remédios tradicionais indígenas — pesquisada em
            fontes de etnobotânica, cartilhas de saúde indígena e relatos de
            comunidades ribeirinhas e amazônicas — organizada em fichas práticas por
            finalidade.
          </p>

          <h2>Nosso compromisso</h2>
          <ul>
            <li>Conteúdo pesquisado, nunca inventado</li>
            <li>Avisos de segurança claros em plantas que exigem cuidado redobrado</li>
            <li>Respeito ao conhecimento tradicional e aos povos que o preservam</li>
            <li>Linguagem simples, sem jargão desnecessário</li>
          </ul>

          <h2>Este site não substitui orientação médica</h2>
          <p>
            Todo o conteúdo do blog e dos ebooks tem caráter educativo, cultural e
            informativo. Ele não substitui consultas, diagnósticos ou tratamentos
            indicados por médicos e profissionais de saúde qualificados. Sempre
            consulte um profissional antes de iniciar qualquer novo remédio ou prática
            de bem-estar.
          </p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
