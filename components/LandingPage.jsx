"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteFooter from "./SiteFooter";
import CheckoutLink from "./CheckoutLink";

/* ---------------- Scroll progress bar + back-to-top + reveal-on-scroll ---------------- */
function useScrollFx() {
  useEffect(() => {
    const progressBar = document.getElementById("scrollProgressBar");
    const topBtn = document.getElementById("scrollToTop");

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + "%";
      if (topBtn) topBtn.classList.toggle("visible", window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const revealEls = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale"
    );
    let observer;
    if ("IntersectionObserver" in window && revealEls.length) {
      document.documentElement.classList.add("has-scroll-anim");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              setTimeout(() => entry.target.classList.add("reveal-completed"), 800);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (observer) observer.disconnect();
    };
  }, []);
}

function ScrollToTopButton() {
  return (
    <button
      type="button"
      className="scroll-to-top"
      id="scrollToTop"
      aria-label="Voltar ao início da página"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

const FAQS = [
  {
    q: "Como eu vou receber os dois ebooks?",
    a: "Assim que seu pagamento for confirmado (no Pix é imediato!), você recebe no seu e-mail o link oficial para baixar os dois PDFs. Você pode começar a ler no mesmo minuto.",
  },
  {
    q: "Consigo abrir no meu celular mesmo sendo antigo?",
    a: "Sim! Os arquivos são PDFs comuns e abrem em qualquer celular, tablet ou computador, direto no navegador ou no app de leitor de PDF, sem ocupar muito espaço no aparelho.",
  },
  {
    q: "Posso imprimir os guias na minha casa ou na gráfica?",
    a: "Com certeza! Os dois ebooks foram diagramados em tamanho padrão (A4/6x9\"), com boa legibilidade, ótimos para imprimir e encadernar ou guardar numa pasta.",
  },
  {
    q: "Os remédios do livro substituem o médico?",
    a: "Não. Os dois guias têm caráter educativo e cultural sobre práticas tradicionais de saúde natural. Eles não substituem consultas, diagnósticos ou tratamentos indicados por médicos e profissionais de saúde qualificados.",
  },
  {
    q: "Vou pagar alguma mensalidade?",
    a: "Não. A compra é feita uma única vez, sem mensalidades ou cobranças recorrentes.",
  },
  {
    q: "E se eu não gostar do material?",
    a: "Você tem 7 dias completos de garantia. Se por qualquer motivo não ficar satisfeito, é só entrar em contato pelo suporte que devolvemos o seu dinheiro.",
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((item, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? "active" : ""}`}>
          <button
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            <span>{item.q}</span>
            <span className="faq-arrow">▼</span>
          </button>
          <div className="faq-answer">{item.a}</div>
        </div>
      ))}
    </div>
  );
}

function EbookMockup({ className = "" }) {
  return (
    <div className={`ebook-mockup-3d ${className}`} aria-label="Mockup 3D dos dois ebooks">
      <div className="ebook-mockup-shadow" aria-hidden="true" />
      <div className="ebook-book ebook-book-back">
        <img src="/assets/remediofrolesta.png" alt="Capa do ebook 100 Remédios da Floresta" />
      </div>
      <div className="ebook-book ebook-book-front">
        <img src="/assets/saudenatural.png" alt="Capa do ebook Saúde Natural" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  useScrollFx();

  return (
    <>
      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-bar" id="scrollProgressBar"></div>
      </div>

      {/* HERO */}
      <header className="hero-section">
        <div className="container">
          <div className="badge-tag scroll-reveal scroll-reveal-up">
            🌿 Saberes da Natureza para Cuidar de Você e da Sua Família
          </div>

          <h1 className="hero-title scroll-reveal scroll-reveal-up delay-100">
            Cure-se com a Força da Natureza e a{" "}
            <span className="highlight">Sabedoria Ancestral dos Povos da Floresta</span>
          </h1>

          <p className="hero-subtitle scroll-reveal scroll-reveal-up delay-200">
            2 guias completos: <strong>10 capítulos de saúde natural</strong> para o
            seu dia a dia e <strong>100 remédios tradicionais indígenas</strong> usados
            há gerações pelos povos da floresta brasileira. Mais de 150 páginas de
            conteúdo prático, para ler no celular ou imprimir em casa.
          </p>

          <div className="mockup-wrapper scroll-reveal scroll-reveal-scale delay-300">
            <EbookMockup />
          </div>

          <div className="hero-explore-box scroll-reveal scroll-reveal-up delay-400">
            <CheckoutLink
              className="btn-hero-explore"
              trackingId="hero-guides"
              trackingLabel="Conhecer os 2 Guias Completos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
              </svg>
              Quero acessar os 2 guias agora
            </CheckoutLink>
          </div>
        </div>
      </header>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item scroll-reveal scroll-reveal-up delay-100">
              <div className="trust-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 7l9 5 9-5-9-5Z" /><path d="M3 17l9 5 9-5" /><path d="M3 12l9 5 9-5" /></svg>
              </div>
              <div className="trust-text">
                <strong>Fontes Reais</strong>
                <span>Pesquisado em etnobotânica</span>
              </div>
            </div>
            <div className="trust-item scroll-reveal scroll-reveal-up delay-200">
              <div className="trust-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
              </div>
              <div className="trust-text">
                <strong>Passo a Passo Simples</strong>
                <span>Modo de preparo explicado</span>
              </div>
            </div>
            <div className="trust-item scroll-reveal scroll-reveal-up delay-300">
              <div className="trust-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
              </div>
              <div className="trust-text">
                <strong>Qualquer Celular</strong>
                <span>Acesso digital imediato</span>
              </div>
            </div>
            <div className="trust-item scroll-reveal scroll-reveal-up delay-400">
              <div className="trust-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>
              </div>
              <div className="trust-text">
                <strong>Pronto para Imprimir</strong>
                <span>Tamanho A4 para encadernar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy-section">
        <div className="container-narrow">
          <div className="philosophy-card scroll-reveal scroll-reveal-scale">
            <div className="philosophy-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
            </div>
            <blockquote className="philosophy-quote">
              "A floresta é a farmácia mais antiga do mundo — e o corpo, quando bem
              cuidado, sabe se curar."
            </blockquote>
            <p className="body-text">
              Muito antes das farmácias, existia a observação silenciosa da natureza:
              os povos indígenas brasileiros, os caboclos da roça e as comunidades
              ribeirinhas aprenderam, geração após geração, quais plantas aliviam a
              dor, quais chás acalmam, quais cascas cicatrizam.
            </p>
            <p className="body-text">
              Reunimos esse conhecimento em dois guias complementares: um caminho
              prático para a saúde natural do dia a dia e uma imersão respeitosa nos
              100 remédios mais tradicionais da floresta brasileira. Juntos, eles
              formam um verdadeiro kit de bem-estar natural para você e sua família.
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="collection-section" id="colecao">
        <div className="container">
          <div className="section-header scroll-reveal scroll-reveal-up">
            <div className="badge-tag">Conteúdo Completo</div>
            <h2 className="section-title">O Que Você Vai Encontrar nos 2 Guias</h2>
            <p className="section-subtitle">
              Um guia para o dia a dia e um guia de sabedoria ancestral — juntos,
              cobrem prevenção, remédios naturais, ervas e cuidados para toda a
              família.
            </p>
          </div>

          <div className="volumes-grid">
            <article className="volume-card scroll-reveal scroll-reveal-up delay-100">
              <div className="volume-cover-area">
                <span className="volume-badge">Ebook 01</span>
                <img src="/assets/saudenatural.png" alt="Capa do ebook Saúde Natural" className="volume-cover-img" />
              </div>
              <div className="volume-peek-row">
                <img src="/assets/preview-saude-1.jpg" alt="Página interna 1" />
                <img src="/assets/preview-saude-3.jpg" alt="Página interna 2" />
                <img src="/assets/preview-saude-2.jpg" alt="Página interna 3" />
              </div>
              <div className="volume-body">
                <h3 className="volume-title">Saúde Sem Remédio</h3>
                <p className="volume-desc">
                  O guia completo de cura natural para o dia a dia: nutrição, ervas,
                  óleos essenciais, mente-corpo, beleza natural e prevenção — em 10
                  capítulos práticos.
                </p>
                <div className="module-highlights">
                  <span>DESTAQUES DO EBOOK:</span>
                  <ul>
                    <li>10 capítulos, dos fundamentos à prevenção</li>
                    <li>Remédios naturais para males do dia a dia</li>
                    <li>Desafio prático de 30 dias incluso</li>
                  </ul>
                </div>
                <div className="volume-footer">
                  <CheckoutLink
                    className="btn-card-package"
                    trackingId="health-guide-checkout"
                    trackingLabel="Quero acessar os 2 guias — Saúde Sem Remédio"
                  >
                    <span>Quero acessar os 2 guias</span>
                    <span className="badge-included">✓ Incluso</span>
                  </CheckoutLink>
                </div>
              </div>
            </article>

            <article className="volume-card scroll-reveal scroll-reveal-up delay-200">
              <div className="volume-cover-area">
                <span className="volume-badge">Ebook 02</span>
                <img src="/assets/remediofrolesta.png" alt="Capa do ebook 100 Remédios da Floresta" className="volume-cover-img" />
              </div>
              <div className="volume-peek-row">
                <img src="/assets/preview-remedios-3.jpg" alt="Página interna 1" />
                <img src="/assets/preview-remedios-1.jpg" alt="Página interna 2" />
                <img src="/assets/preview-remedios-2.jpg" alt="Página interna 3" />
              </div>
              <div className="volume-body">
                <h3 className="volume-title">100 Remédios da Floresta</h3>
                <p className="volume-desc">
                  O guia ancestral de cura natural dos povos indígenas: 100 remédios
                  tradicionais organizados por finalidade, com planta, preparo e uso
                  explicados em fichas práticas.
                </p>
                <div className="module-highlights">
                  <span>DESTAQUES DO EBOOK:</span>
                  <ul>
                    <li>100 remédios em 10 capítulos temáticos</li>
                    <li>Glossário completo dos modos de preparo</li>
                    <li>Índice alfabético de todas as plantas</li>
                  </ul>
                </div>
                <div className="volume-footer">
                  <CheckoutLink
                    className="btn-card-package"
                    trackingId="forest-guide-checkout"
                    trackingLabel="Quero acessar os 2 guias — 100 Remédios da Floresta"
                  >
                    <span>Quero acessar os 2 guias</span>
                    <span className="badge-included">✓ Incluso</span>
                  </CheckoutLink>
                </div>
              </div>
            </article>
          </div>

          <div className="master-banner scroll-reveal scroll-reveal-scale">
            <div className="master-mockup-wrapper">
              <EbookMockup className="master-floating-book" />
            </div>
            <div className="master-banner-details">
              <div className="master-badge-gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7-6.2-3.4L5.8 21.2 7 14.2l-5-4.9 7.1-.7L12 2z" /></svg>
                <span>INCLUSO NO SEU KIT • 2 EBOOKS COMPLETOS</span>
              </div>
              <h3>O Kit Sabedoria Natural Completo</h3>
              <p>
                Além dos ebooks separados para consulta rápida, você recebe os dois
                guias completos em arquivos de alta resolução, prontos para salvar no
                celular, no tablet ou imprimir e encadernar como quiser.
              </p>
              <div className="master-stats-grid">
                <div className="stat-box"><span className="stat-number">02</span><span className="stat-label">Ebooks Completos</span></div>
                <div className="stat-box"><span className="stat-number">100</span><span className="stat-label">Remédios Indígenas</span></div>
                <div className="stat-box"><span className="stat-number">10</span><span className="stat-label">Capítulos de Saúde Natural</span></div>
                <div className="stat-box"><span className="stat-number">150+</span><span className="stat-label">Páginas de Conteúdo</span></div>
              </div>
              <CheckoutLink
                className="btn-cta u-inline-cta"
                trackingId="collection-checkout"
                trackingLabel="Quero acessar o Kit Sabedoria Natural completo"
              >
                Quero acessar os 2 guias agora
              </CheckoutLink>
            </div>
          </div>
        </div>
      </section>

      {/* HOW YOU RECEIVE IT */}
      <section className="app-feature-section">
        <div className="container">
          <div className="app-grid">
            <div className="app-info scroll-reveal scroll-reveal-left">
              <div className="badge-tag">Simples e Direto</div>
              <h2>Como Você Recebe Seu Material</h2>
              <p className="feature-lead">
                Sem aplicativo complicado, sem senha difícil de lembrar. Você recebe
                os arquivos e já pode começar a ler no mesmo minuto:
              </p>
              <ul className="app-features-list">
                <li className="scroll-reveal scroll-reveal-up delay-100">
                  <span className="check-icon">✓</span>
                  <div><strong>PDF de Alta Qualidade:</strong><p className="feature-description">Diagramado com letras claras e organizado por capítulos, fácil de navegar.</p></div>
                </li>
                <li className="scroll-reveal scroll-reveal-up delay-200">
                  <span className="check-icon">✓</span>
                  <div><strong>Abre em Qualquer Celular:</strong><p className="feature-description">Funciona no navegador ou app de PDF de qualquer aparelho, sem instalar nada extra.</p></div>
                </li>
                <li className="scroll-reveal scroll-reveal-up delay-300">
                  <span className="check-icon">✓</span>
                  <div><strong>Pronto para Imprimir:</strong><p className="feature-description">Formatado em tamanho A4, ótimo para imprimir e guardar numa pasta ou encadernar.</p></div>
                </li>
                <li className="scroll-reveal scroll-reveal-up delay-400">
                  <span className="check-icon">✓</span>
                  <div><strong>Acesso Imediato:</strong><p className="feature-description">O link de download chega no seu e-mail assim que o pagamento é confirmado.</p></div>
                </li>
              </ul>
            </div>
            <div className="app-demo-box scroll-reveal scroll-reveal-right delay-200">
              <span className="app-demo-badge">📄 Acesso Digital Incluso</span>
              <h3 className="feature-title" style={{ fontFamily: "var(--font-serif)", marginBottom: "0.75rem" }}>Seus 2 Guias, Sempre à Mão</h3>
              <p className="feature-description" style={{ marginBottom: "1rem" }}>
                Você recebe o link de acesso no seu e-mail logo após a confirmação do pagamento.
              </p>
              <EbookMockup className="app-demo-image" />
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="guarantee-section">
        <div className="container">
          <div className="guarantee-card scroll-reveal scroll-reveal-scale">
            <div className="guarantee-badge" aria-label="7 dias de garantia">
              <svg className="guarantee-shield" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3 19 6v5c0 4.6-2.8 8.4-7 10-4.2-1.6-7-5.4-7-10V6l7-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>7 dias de garantia</span>
            </div>
            <div className="guarantee-text">
              <h3>Garantia de 7 Dias: Experimente sem Risco</h3>
              <p>
                Você tem 7 dias após a compra para explorar com calma os dois guias,
                testar os remédios e conhecer o conteúdo completo. Se perceber que o
                Kit Sabedoria Natural não é para você, basta solicitar o reembolso
                pelos canais de suporte informados na compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="offer-section" id="oferta">
        <div className="container">
          <div className="offer-card scroll-reveal scroll-reveal-scale">
            <div className="offer-ribbon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 22c4.4 0 8-3.3 8-7.5 0-3-1.7-5.4-4.2-7.5.1 2.7-1.4 4.2-3 4.2.6-3.8-1.4-7-4.4-9.2.2 3.7-4.4 6.2-4.4 11.2C4 18.1 7.6 22 12 22Z" />
                <path d="M9.5 17.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-1.1-.6-2-1.5-2.8 0 1-.6 1.6-1.2 1.6.1-1.4-.6-2.5-1.8-3.4.1 1.7-.5 2.8-.5 4.6Z" />
              </svg>
              <span>Acesso digital aos 2 guias completos</span>
            </div>
            <h2 className="offer-heading">Leve o Kit Sabedoria Natural Completo</h2>
            <p className="feature-lead">Os 2 guias completos para cuidar de você e da sua família com a força da natureza.</p>
            <ul className="offer-summary-list">
              <li><span className="offer-summary-copy"><strong>Ebook Saúde Sem Remédio</strong><span>10 capítulos completos + desafio de 30 dias</span></span></li>
              <li><span className="offer-summary-copy"><strong>Ebook 100 Remédios da Floresta</strong><span>100 remédios tradicionais indígenas</span></span></li>
              <li><span className="offer-summary-copy"><strong>Arquivos em Alta Resolução</strong><span>Prontos para ler ou imprimir</span></span></li>
              <li><span className="offer-summary-copy"><strong>Garantia de 7 Dias</strong><span>Compra protegida</span></span></li>
            </ul>
            <CheckoutLink
              className="btn-cta offer-cta"
              trackingId="offer-checkout"
              trackingLabel="Quero garantir meu acesso aos 2 guias"
            >
              QUERO ACESSAR OS 2 GUIAS AGORA
            </CheckoutLink>
            <div className="offer-trust-row">
              <span className="offer-trust-item"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>Pagamento seguro</span>
              <span className="offer-trust-item"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>Link por e-mail após a confirmação</span>
              <span className="offer-trust-item"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 10h18m-12 5 2 2 4-4" /></svg>Sem mensalidades</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container-narrow">
          <div className="section-header scroll-reveal scroll-reveal-up">
            <div className="badge-tag">Tire Suas Dúvidas</div>
            <h2 className="section-title">Perguntas Frequentes</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />

      <ScrollToTopButton />
    </>
  );
}
