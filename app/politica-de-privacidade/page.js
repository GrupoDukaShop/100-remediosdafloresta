import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Política de Privacidade — Kit Sabedoria Natural",
  description: "Política de privacidade do site Kit Sabedoria Natural.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <section className="static-page">
        <div className="container-narrow">
          <h1>Política de Privacidade</h1>

          <p>
            Esta Política de Privacidade descreve como o site Kit Sabedoria Natural
            ("nós", "site") coleta, usa e protege as informações dos visitantes.
            [Substitua este texto pela sua política final antes de publicar — este é
            um modelo de ponto de partida.]
          </p>

          <h2>Informações que coletamos</h2>
          <p>
            Podemos coletar informações fornecidas voluntariamente por você (como
            e-mail, ao entrar em contato ou realizar uma compra) e informações
            coletadas automaticamente por cookies e tecnologias semelhantes, como
            endereço IP, tipo de navegador e páginas visitadas.
          </p>

          <h2>Como usamos suas informações</h2>
          <ul>
            <li>Para processar compras e enviar o material adquirido</li>
            <li>Para responder a dúvidas de suporte</li>
            <li>Para melhorar o conteúdo e a experiência do site</li>
          </ul>

          <h2>Compartilhamento de dados</h2>
          <p>
            Não vendemos suas informações pessoais. Podemos compartilhar dados com
            processadores de pagamento (como a Cakto) estritamente para viabilizar a
            compra e a entrega do material adquirido.
          </p>

          <h2>Seus direitos</h2>
          <p>
            Você pode solicitar a exclusão dos seus dados pessoais entrando em contato
            pelos canais informados no site.
          </p>

          <h2>Alterações nesta política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. Recomendamos revisitar
            esta página de tempos em tempos.
          </p>

          <p><em>Última atualização: [inserir data].</em></p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
