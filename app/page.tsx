"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const navItems = [
  ["Início", "#inicio"],
  ["Como funciona", "#como-funciona"],
  ["O que auditamos", "#o-que-auditamos"],
  ["Recuperação", "#recuperacao"],
  ["Sobre a Conteii", "#sobre"],
  ["FAQ", "#faq"],
] as const;

type AuditItem = {
  title: string;
  text: string;
  note?: string;
  dark?: boolean;
};

type AuditStep = {
  title: string;
  text: string;
  extra?: string;
  highlight?: boolean;
  documents?: string[];
};

const auditItems: AuditItem[] = [
  {
    title: "Taxas e condições comerciais",
    text: "Analisamos as condições acordadas com as adquirentes e confrontamos com aquilo que foi efetivamente aplicado.",
  },
  {
    title: "Antecipações de recebíveis",
    text: "Verificamos antecipações automáticas e esporádicas, seus valores, taxas e condições de contratação.",
    note: "O relatório-base identifica separadamente antecipações automáticas e esporádicas.",
  },
  {
    title: "Gravames",
    text: "Analisamos ocorrências relacionadas a travas e cessões incidentes sobre recebíveis e verificamos, com a documentação necessária, sua efetiva liquidação.",
    note: "No relatório analisado, essa frente chegou a representar a maior parcela dos valores inicialmente identificados.",
    dark: true,
  },
  {
    title: "Conciliação bancária",
    text: "Confrontamos o valor informado pela adquirente com aquilo que efetivamente pode ser identificado no crédito bancário da empresa.",
  },
  {
    title: "Chargebacks",
    text: "Analisamos estornos e contestações registrados na operação e verificamos as ocorrências identificadas.",
  },
  {
    title: "POS e outras cobranças",
    text: "Analisamos cobranças relacionadas a terminais e outras ocorrências encontradas durante a auditoria.",
    note: "No relatório real, por exemplo, foram identificadas cobranças relacionadas a POS inativo.",
    dark: true,
  },
  {
    title: "Arquivos de transações",
    text: "Confrontamos os arquivos de vendas capturados com aquilo que a adquirente registrou como transacionado.",
  },
  {
    title: "Outras divergências",
    text: "A Conteii não procura apenas um único tipo de problema. A auditoria analisa o histórico da operação e investiga as inconsistências encontradas nos dados disponíveis.",
  },
];

const auditSteps: AuditStep[] = [
  {
    title: "Analisamos e auditamos",
    text: "Auditamos até os últimos 5 anos da operação, de acordo com o histórico e a documentação disponíveis. Organizamos as informações por empresa, adquirente, período e tipo de análise.",
  },
  {
    title: "Identificamos as divergências",
    text: "Nossa análise busca diferenças entre aquilo que deveria ter acontecido e aquilo que efetivamente aconteceu. Cada ocorrência é mensurada e classificada.",
  },
  {
    title: "Validamos as informações",
    text: "Encontrar uma divergência não significa que o dinheiro já está recuperado. Algumas ocorrências podem depender de contratos, extratos bancários, condições comerciais, informações da adquirente e confirmações do próprio cliente.",
    highlight: true,
    documents: ["Contratos", "Extratos bancários", "Condições comerciais", "Informações da adquirente", "Confirmações do cliente"],
  },
  {
    title: "Apresentamos o relatório",
    text: "Depois da análise, o cliente recebe um relatório detalhado demonstrando aquilo que foi encontrado. Não mostramos apenas um número. Mostramos de onde ele veio.",
  },
  {
    title: "Buscamos a recuperação",
    text: "Com os valores devidamente confirmados, a Conteii inicia a etapa de recuperação junto às adquirentes envolvidas. Apresentamos os apontamentos, acompanhamos os posicionamentos, buscamos propostas de composição e apresentamos ao cliente as alternativas encontradas.",
    extra: "A decisão sobre aceitar ou não qualquer proposta é sempre do cliente.",
  },
  {
    title: "Quando o acordo não é interessante",
    text: "Quando uma solução extrajudicial não é alcançada ou quando a proposta apresentada pela adquirente não atende aos interesses do cliente, o caso pode seguir para avaliação e estratégia jurídica. O corpo jurídico responsável recebe as informações, cálculos e evidências levantadas durante a auditoria para avaliação das medidas cabíveis.",
  },
  {
    title: "Só ganhamos no êxito",
    text: "Nosso resultado está ligado ao resultado do cliente. A remuneração da Conteii na recuperação está vinculada ao valor efetivamente recuperado, conforme as condições estabelecidas em contrato.",
    extra: "Identificado não é recuperado. Resultado é dinheiro efetivamente recuperado.",
    highlight: true,
  },
];

const reportItems = [
  "CNPJs analisados",
  "Adquirentes analisadas",
  "Período auditado",
  "Tipos de análise realizadas",
  "Divergências encontradas",
  "Valores identificados",
  "Pendências para confirmação",
  "Situação de cada ocorrência",
  "Valores confirmados",
  "Valores em recuperação",
  "Valores efetivamente recuperados",
];

const statuses = [
  ["Identificado", "A análise encontrou uma possível divergência."],
  ["Em validação", "Ainda existem informações ou documentos necessários."],
  ["Confirmado", "As informações disponíveis sustentam a ocorrência e seu cálculo."],
  ["Em recuperação", "A etapa de recuperação está em andamento."],
  ["Recuperado", "O resultado financeiro foi efetivamente obtido."],
];

const recoveryItems = [
  "Apresentação dos apontamentos",
  "Formalização das informações",
  "Memória de cálculo",
  "Interação com as adquirentes",
  "Acompanhamento das respostas",
  "Negociação",
  "Recebimento de propostas",
  "Apresentação das alternativas ao cliente",
];

const audiences = [
  "Redes de varejo",
  "Redes de farmácias",
  "Supermercados e atacarejos",
  "Franquias",
  "Clínicas e redes de saúde",
  "Restaurantes",
  "Pet shops",
  "E-commerce",
  "Grupos empresariais",
  "Outras operações com grande volume de recebíveis",
];

const competences = [
  ["Tecnologia", "Organização e cruzamento de grandes volumes de informações."],
  ["Inteligência financeira", "Análise das transações, recebíveis, taxas, antecipações e movimentações financeiras."],
  ["Auditoria", "Investigação das inconsistências e mensuração dos impactos."],
  ["Recuperação", "Transformação dos achados confirmados em ações concretas para buscar o ressarcimento."],
  ["Suporte jurídico", "Quando a solução extrajudicial não atende ao cliente, a documentação e as evidências levantadas subsidiam a estratégia jurídica responsável pela continuidade do caso."],
];

const faqs = [
  ["Preciso saber se tenho algum valor a recuperar?", "Não. É justamente para descobrir isso que a auditoria existe."],
  ["Quantos anos a Conteii analisa?", "Podemos auditar até os últimos cinco anos da operação, conforme o histórico e a documentação disponíveis."],
  ["A Conteii analisa somente taxas de cartão?", "Não. Nossa auditoria pode envolver taxas, antecipações, gravames, conciliação bancária, chargebacks, POS, arquivos de transações e outras divergências encontradas dentro do escopo da análise."],
  ["Vocês analisam várias adquirentes?", "Sim. A operação pode envolver múltiplas adquirentes."],
  ["E vários CNPJs?", "Sim. Podemos analisar diferentes empresas de um mesmo grupo e consolidar os resultados."],
  ["Todo valor encontrado será recuperado?", "Não. Existe diferença entre valor identificado, valor confirmado e valor efetivamente recuperado. Um valor inicialmente identificado pode depender de documentos adicionais para sua confirmação."],
  ["Vocês negociam com a adquirente?", "A Conteii conduz a etapa de recuperação extrajudicial dos valores confirmados, buscando posicionamentos e propostas junto às instituições envolvidas."],
  ["Sou obrigado a aceitar a proposta?", "Não. A decisão pertence ao cliente."],
  ["E se a proposta não for interessante?", "O cliente pode não aceitá-la. Quando for cabível seguir por uma estratégia jurídica, as informações técnicas, cálculos e evidências produzidos pela auditoria servem de base para essa etapa."],
  ["A Conteii cobra antes da recuperação?", "A remuneração vinculada à recuperação ocorre no êxito, conforme as condições estabelecidas no contrato."],
  ["A Conteii garante que encontrará dinheiro?", "Não. Uma auditoria séria não pode começar com um resultado previamente definido. Analisamos os dados e demonstramos aquilo que efetivamente encontrarmos."],
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    let disposed = false;
    let disposeAnimations = () => {};

    async function setupAnimations() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const introTargets = [
          ".siteHeader",
          ".hero .eyebrow",
          ".hero h1",
          ".heroCopy",
          ".heroActions > *",
          ".heroTags span",
          ".heroNote",
        ];

        gsap.set(introTargets, { willChange: "transform, opacity" });

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => gsap.set(introTargets, { clearProps: "willChange" }),
        });

        intro
          .from(".siteHeader", { autoAlpha: 0, y: -14, duration: 0.42 })
          .from(".hero .eyebrow", { autoAlpha: 0, y: 12, duration: 0.34 }, "-=0.18")
          .from(".hero h1", { autoAlpha: 0, y: 28, duration: 0.72 }, "-=0.12")
          .from(".heroCopy", { autoAlpha: 0, y: 18, duration: 0.5 }, "-=0.42")
          .from(".heroActions > *", { autoAlpha: 0, y: 14, duration: 0.38, stagger: 0.07 }, "-=0.28")
          .from(".heroTags span", { autoAlpha: 0, y: 10, duration: 0.32, stagger: 0.045 }, "-=0.22")
          .from(".heroNote", { autoAlpha: 0, y: 10, duration: 0.32 }, "-=0.2");

        gsap.utils.toArray<HTMLElement>(".section > .container:not(.processPin)", root).forEach((section) => {
          const items = Array.from(section.children);
          if (!items.length) return;

          gsap.from(items, {
            autoAlpha: 0,
            y: 30,
            duration: 0.66,
            stagger: 0.075,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              once: true,
            },
            onStart: () => gsap.set(items, { willChange: "transform, opacity" }),
            onComplete: () => gsap.set(items, { clearProps: "willChange" }),
          });
        });

        const interactive = gsap.utils.toArray<HTMLElement>(
          ".button:not(.nonInteractive), .navCta",
          root,
        );
        const removeInteractions = interactive.map((element) => {
          const lift = () => gsap.to(element, { y: -2, scale: 1.012, duration: 0.18, ease: "power2.out", overwrite: "auto" });
          const settle = () => gsap.to(element, { y: 0, scale: 1, duration: 0.24, ease: "power2.out", overwrite: "auto" });
          const press = () => gsap.to(element, { y: 0, scale: 0.985, duration: 0.1, ease: "power1.out", overwrite: "auto" });

          element.addEventListener("pointerenter", lift);
          element.addEventListener("pointerleave", settle);
          element.addEventListener("pointerdown", press);
          element.addEventListener("pointerup", lift);

          return () => {
            element.removeEventListener("pointerenter", lift);
            element.removeEventListener("pointerleave", settle);
            element.removeEventListener("pointerdown", press);
            element.removeEventListener("pointerup", lift);
          };
        });

        return () => removeInteractions.forEach((remove) => remove());
      }, root);

      media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const processSection = root.querySelector<HTMLElement>(".processSection");
        const processPin = root.querySelector<HTMLElement>(".processPin");
        const processTrack = root.querySelector<HTMLElement>(".processTrack");
        const processCards = gsap.utils.toArray<HTMLElement>(".processStep", root);

        if (!processSection || !processPin || !processTrack || processCards.length <= 3) return;

        const cardsToReveal = processCards.slice(3);
        gsap.set(cardsToReveal, { autoAlpha: 0, y: 28 });
        gsap.set(processTrack, { willChange: "transform" });

        const processTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: processSection,
            start: "top top",
            end: () => `+=${cardsToReveal.length * Math.max(window.innerHeight * 0.17, 150)}`,
            pin: processPin,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cardsToReveal.forEach((card, revealIndex) => {
          const cardIndex = revealIndex + 3;
          const firstVisibleCard = processCards[cardIndex - 2];

          processTimeline
            .to(processTrack, {
              y: () => -firstVisibleCard.offsetTop,
              duration: 1,
              ease: "power2.inOut",
            })
            .to(card, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power1.inOut",
            }, "<");
        });

        return () => {
          gsap.set([...processCards, processTrack], { clearProps: "all" });
        };
      }, root);

      disposeAnimations = () => media.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    void setupAnimations().catch((error: unknown) => {
      if (!disposed) {
        console.warn("As animações não puderam ser iniciadas nesta sessão.", error);
      }
    });

    return () => {
      disposed = true;
      disposeAnimations();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const runtimeConfig = typeof window === "undefined"
      ? undefined
      : (window as Window & { CONTEII_CONFIG?: { formEndpoint?: string } }).CONTEII_CONFIG;
    const endpoint = runtimeConfig?.formEndpoint || process.env.NEXT_PUBLIC_CONTEII_FORM_ENDPOINT;

    if (!endpoint) {
      setFormStatus("O canal de envio ainda precisa ser configurado.");
      return;
    }

    setSubmitting(true);
    setFormStatus("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Falha no envio");
      event.currentTarget.reset();
      setFormStatus("Solicitação enviada com sucesso.");
    } catch {
      setFormStatus("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={pageRef} className="siteShell">
      <a className="skipLink" href="#conteudo">Ir para o conteúdo</a>
      <header className="siteHeader">
        <div className="container nav">
          <a href="#inicio" aria-label="Conteii — início" onClick={() => setMenuOpen(false)}>
            <img className="navLogo" src="/logo-conteii-white.png" alt="Conteii" />
          </a>
          <button
            className="menuButton"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav id="main-navigation" className={`navLinks ${menuOpen ? "navLinksOpen" : ""}`} aria-label="Navegação principal">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <a className="navCta" href="#contato">Quero auditar minha empresa</a>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="container heroGrid">
            <div>
              <span className="eyebrow">Auditoria e Recuperação de Recebíveis</span>
              <h1>Sua empresa recebeu <strong>tudo o que deveria receber</strong> das adquirentes nos últimos 5 anos?</h1>
              <p className="heroCopy">A Conteii audita minuciosamente o histórico das operações com cartões da sua empresa para identificar divergências entre o que foi acordado e o que efetivamente aconteceu com seus recebíveis.</p>
              <div className="heroActions">
                <a className="button" href="#contato">Quero auditar minha empresa</a>
                <span className="muted">Remuneração vinculada ao êxito da recuperação, conforme contrato.</span>
              </div>
              <div className="heroTags" aria-label="Etapas resumidas">
                <span>Encontramos.</span><span>Demonstramos.</span><span>Comprovamos.</span><span>E buscamos recuperar.</span>
              </div>
              <p className="heroNote">Você não precisa saber se existe uma divergência. É justamente isso que vamos descobrir.</p>
            </div>
          </div>
        </section>

        <section className="section" id="problema">
          <div className="container problemLayout">
            <div className="problemTop">
              <div className="problemIntro">
                <span className="eyebrow">O problema</span>
                <h2 className="problemTitle">Você sabe quanto sua empresa vendeu. <span>Mas sabe se recebeu exatamente como deveria?</span></h2>
                <p className="lead">Entre uma venda realizada no cartão e o dinheiro chegar à conta da empresa existe uma série de movimentações.</p>
              </div>
              <div className="moneyPath">
                {[
                  ["Venda", "origem"], ["Adquirente", "processamento"], ["Taxas e condições comerciais", "contrato"],
                  ["Agenda de recebíveis", "agenda"], ["Antecipações", "movimentação"], ["Gravames", "ocorrência"],
                  ["Liquidações", "pagamento"], ["Banco", "conciliação"], ["Dinheiro na conta", "resultado"],
                ].map(([label, tag]) => <div className="moneyStep" key={label}><span>{label}</span><small>{tag}</small></div>)}
              </div>
            </div>
            <div className="problemBanner">
              <h3 className="titleMd">A Conteii audita esse caminho.</h3>
              <div className="problemBannerCopy">
                <p>Uma operação pode estar correta na venda e ainda apresentar divergências posteriormente em taxas, antecipações, gravames, cobranças ou liquidações.</p>
                <p>O relatório real analisado pela Conteii contempla diferentes frentes, incluindo arquivos de venda, gravames, antecipações, POS, chargebacks e conciliação bancária.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section mist">
          <div className="container twoCol">
            <div>
              <span className="eyebrow">O que a Conteii faz</span>
              <h2 className="titleLg">Nós reconstruímos o que aconteceu com os seus recebíveis.</h2>
              <p className="lead">A Conteii cruza informações financeiras, operacionais e contratuais para verificar se aquilo que deveria ter acontecido corresponde ao que efetivamente aconteceu.</p>
            </div>
            <div className="statement">
              <h3 className="titleMd">Não partimos do princípio de que existe erro. <strong>Partimos dos dados.</strong></h3>
              <p>Se estiver correto, os dados mostram.</p>
              <p>Se existir uma divergência, queremos descobrir onde ela aconteceu, quanto representa e quais informações a sustentam.</p>
              <div className="dataRule"><span>O que foi acordado</span><span>O que foi realizado</span><span>Onde existe diferença</span><span>O que sustenta o achado</span></div>
            </div>
          </div>
        </section>

        <section className="section" id="o-que-auditamos">
          <div className="container">
            <span className="eyebrow">O que auditamos</span>
            <h2 className="titleLg">Nossa auditoria vai além da conferência de taxas.</h2>
            <div className="auditGrid">
              {auditItems.map((item, index) => (
                <article className={`auditCard ${item.dark ? "darkCard" : ""}`} key={item.title}>
                  <div className="number">{String(index + 1).padStart(2, "0")}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.note && <small className="evidence">{item.note}</small>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section orangeSection">
          <div className="container impactGrid">
            <div className="impactContent">
              <span className="eyebrow">Precisão antes da recuperação</span>
              <h2 className="titleXl">A Conteii não procura um erro.</h2>
              <h3 className="titleMd">Ela reconstrói o que aconteceu com o seu dinheiro.</h3>
              <div className="impactLines">
                <span>Onde aconteceu.</span><span>Quando aconteceu.</span><span>Por quanto tempo aconteceu.</span>
                <span>Quanto representa.</span><span>Qual adquirente está envolvida.</span><span>O que precisa ser confirmado.</span>
              </div>
              <p className="spacedTop">Para transformar uma divergência em um valor efetivamente recuperável.</p>
            </div>
          </div>
        </section>

        <section className="section mist processSection" id="como-funciona">
          <div className="container processPin">
            <div className="processHeading">
              <span className="eyebrow">Como funciona</span>
              <h2 className="titleLg">Da auditoria ao dinheiro recuperado.</h2>
            </div>
            <div className="processViewport">
              <div className="steps processTrack">
              {auditSteps.map((step, index) => (
                <article className={`step processStep ${step.highlight ? "stepHighlight" : ""}`} key={step.title}>
                  <div className="stepNumber">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{step.title}</h3><p>{step.text}</p>
                    {step.documents && <ul className="documentList">{step.documents.map((document) => <li key={document}>{document}</li>)}</ul>}
                    {index === 2 && <div className="statusFlow"><span>Valor identificado</span><span>Valor em validação</span><span>Valor confirmado</span><span>Valor em recuperação</span><span>Valor recuperado</span></div>}
                    {step.extra && <p className="stepExtra">{step.extra}</p>}
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section darkSection">
          <div className="container twoCol alignCenter">
            <div>
              <span className="eyebrow">O relatório Conteii</span>
              <h2 className="titleLg">Você não recebe uma planilha com um número solto.</h2>
              <p className="lead">Você recebe a visão detalhada da auditoria.</p>
              <p className="muted">O relatório consolida os resultados por empresa, adquirente e tipo de análise.</p>
            </div>
            <div className="reportShell">
              <div className="reportTop"><strong>Visão detalhada da auditoria</strong><span>Estrutura sem dados fictícios</span></div>
              <div className="reportBody">
                <div className="reportList">{reportItems.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="reportAxis"><small>Visualizações</small><b>Por empresa</b><b>Por adquirente</b><b>Por tipo de divergência</b><b>Por período</b><b>Por situação</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section creamSection">
          <div className="container distinction">
            <div>
              <span className="eyebrow">Uma distinção central</span>
              <h2 className="titleXl">Identificado não é recuperado.</h2>
              <p className="lead">Uma auditoria séria não transforma uma hipótese em dinheiro antes da hora. Um valor inicialmente encontrado pode precisar de documentação para ser confirmado.</p>
              <div className="distinctionNote">Não vendemos expectativa como resultado.</div>
            </div>
            <div className="distinctionTrack">
              {statuses.map(([title, text]) => <article className="distinctionCard" key={title}><h3>{title}</h3><p>{text}</p></article>)}
              <p className="muted">No relatório analisado, parte relevante do valor identificado dependia de extratos e contratos antes de poder ser considerada efetivamente confirmada.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container twoCol alignCenter">
            <div>
              <span className="eyebrow">Uma pequena divergência pode não ser pequena</span>
              <h2 className="titleLg">O problema é a repetição.</h2>
              <p className="lead">Uma diferença pequena em uma única transação pode parecer irrelevante.</p>
              <p>Mas uma empresa pode realizar milhares de vendas, todos os meses, durante anos, em diferentes adquirentes e com diferentes condições.</p>
              <h3 className="titleMd accent spacedTop">Quando uma divergência se repete, o impacto se acumula.</h3>
              <p><strong>Por isso analisamos histórico. Não apenas o mês passado.</strong></p>
            </div>
            <div className="repeatVisual"><div className="curve" /><span>Impacto acumulado</span></div>
          </div>
        </section>

        <section className="section darkSection" id="recuperacao">
          <div className="container twoCol">
            <div>
              <span className="eyebrow">Recuperação</span>
              <h2 className="titleLg">Encontrar é apenas o começo.</h2>
              <p className="lead muted">O trabalho da Conteii não termina quando o relatório fica pronto. Com as divergências confirmadas, iniciamos a etapa de recuperação.</p>
              <h3 className="titleMd spacedTop">Primeiro buscamos resolver.</h3>
              <p className="muted">O relatório da operação trata a recuperação administrativa junto às adquirentes como a primeira etapa para os valores já confirmados.</p>
            </div>
            <div className="recoveryList">{recoveryItems.map((item) => <div className="recoveryItem" key={item}>{item}</div>)}</div>
          </div>
        </section>

        <section className="section mist">
          <div className="container">
            <span className="eyebrow">Para quem é a Conteii</span>
            <h2 className="titleLg">Quanto maior sua operação com cartões, maior a quantidade de informações que precisam ser conferidas.</h2>
            <p className="lead">A Conteii é especialmente indicada para empresas com alto volume de vendas em cartões, múltiplos CNPJs, múltiplas unidades, mais de uma adquirente, antecipação de recebíveis, operações parceladas e histórico relevante de transações.</p>
            <div className="audienceGrid">{audiences.map((audience) => <div className="audienceCard" key={audience}>{audience}</div>)}</div>
            <a className="button spacedTop" href="#contato">Quero auditar minha operação</a>
          </div>
        </section>

        <section className="section">
          <div className="container questionBlock">
            <span className="eyebrow">Você não precisa desconfiar da sua adquirente</span>
            <h2 className="titleLg">Auditar não significa acusar.</h2>
            <p>A Conteii não começa dizendo que alguém fez algo errado. Começamos com uma pergunta:</p>
            <div className="question">O acordado foi exatamente o realizado?</div>
            <div className="answerSplit">
              <div className="answer"><b>Se sim</b>A auditoria demonstrará.</div>
              <div className="answer"><b>Se não</b>A divergência precisa ser identificada, mensurada e documentada.</div>
            </div>
            <h3 className="titleMd spacedTop">Uma relação financeira relevante precisa poder ser conferida.</h3>
          </div>
        </section>

        <section className="section darkSection">
          <div className="container">
            <span className="eyebrow">Tecnologia + inteligência financeira + especialidade jurídica</span>
            <h2 className="titleLg">Três competências trabalhando sobre o mesmo problema.</h2>
            <div className="competenceGrid">{competences.map(([title, text]) => <article className="competence" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="section">
          <div className="container whyGrid">
            <div>
              <span className="eyebrow">Por que Conteii</span>
              <h2 className="titleLg">Porque não entregamos apenas informação.</h2>
              <p className="lead">Acompanhamos cada ocorrência pelo seu estágio real.</p>
            </div>
            <div className="whyList"><span>Investigamos o histórico.</span><span>Identificamos as divergências.</span><span>Demonstramos os números.</span><span>Organizamos as evidências.</span><span>Buscamos recuperar.</span></div>
          </div>
        </section>

        <section className="section mist" id="cases">
          <div className="container">
            <span className="eyebrow">Cases</span>
            <h2 className="titleLg">O que uma auditoria pode encontrar</h2>
            <div className="casesPlaceholder">
              <img src="/symbol-conteii-orange.png" alt="" />
              <h3>Área reservada para cases reais</h3>
              <p>Esta seção deve usar exclusivamente cases reais, validados e autorizados, sem misturar valor identificado, valor confirmado e valor efetivamente recuperado.</p>
              <span>Conteúdo aguardando validação e autorização</span>
            </div>
          </div>
        </section>

        <section className="section" id="sobre">
          <div className="container aboutGrid">
            <div className="aboutMark"><img src="/symbol-conteii-orange.png" alt="Símbolo Conteii" /></div>
            <div>
              <span className="eyebrow">Sobre a Conteii</span>
              <h2 className="titleLg">Inteligência financeira para entender o que aconteceu com o dinheiro das empresas.</h2>
              <p>A Conteii é uma empresa especializada em auditoria e recuperação de recebíveis.</p>
              <p>Combinamos tecnologia, inteligência financeira, análise operacional e suporte especializado para investigar operações realizadas com adquirentes e transformar grandes volumes de informações em respostas claras.</p>
              <div className="mission">Nossa missão é simples: descobrir se o dinheiro que sua empresa deveria receber foi exatamente o dinheiro que ela recebeu. E, quando identificamos e confirmamos uma divergência: buscar sua recuperação.</div>
            </div>
          </div>
        </section>

        <section className="section darkSection">
          <div className="container securityGrid">
            <div><div className="securityLock" aria-hidden="true" /></div>
            <div>
              <span className="eyebrow">Segurança e confidencialidade</span>
              <h2 className="titleLg">Estamos lidando com informações financeiras da sua empresa.</h2>
              <p className="lead muted">Por isso, confidencialidade e responsabilidade no tratamento dos dados fazem parte do processo.</p>
              <p className="muted">Os relatórios e documentos são tratados respeitando as regras aplicáveis de proteção de dados e as condições estabelecidas com cada cliente.</p>
              <p className="muted">O relatório real utilizado como referência possui versão anonimizada, preservando os números e conclusões ao mesmo tempo em que restringe informações de identificação empresarial e bancária.</p>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <span className="eyebrow">FAQ</span>
            <h2 className="titleLg">Perguntas frequentes</h2>
            <div className="faq">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0 ? true : undefined}>
                  <summary>{question}</summary><p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section ctaFinal" id="contato">
          <div className="container ctaGrid">
            <div>
              <span className="eyebrow">Solicite uma análise</span>
              <h2 className="titleLg">Você já sabe quanto sua empresa vendeu. Agora descubra se recebeu como deveria.</h2>
              <p className="lead muted">Até cinco anos da operação podem esconder informações que nunca foram conferidas profundamente. Você não precisa começar desconfiando de ninguém.</p>
              <div className="startData">Comece pelos dados.</div>
              <p className="spacedTop">Fale com um especialista da Conteii e entenda quais informações são necessárias para iniciar a análise da sua operação.</p>
            </div>
            <form className="formShell" onSubmit={handleSubmit}>
              <h3>Vamos começar pela sua operação.</h3>
              <div className="fields">
                <label>Nome<input name="nome" autoComplete="name" required /></label>
                <label>Empresa<input name="empresa" autoComplete="organization" required /></label>
                <label>CNPJ<input name="cnpj" inputMode="numeric" required /></label>
                <label>Cargo<input name="cargo" autoComplete="organization-title" required /></label>
                <label>WhatsApp<input name="whatsapp" type="tel" autoComplete="tel" required /></label>
                <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
                <label>Segmento<input name="segmento" required /></label>
                <label>Número de unidades<input name="unidades" type="number" min="1" required /></label>
                <label>Volume médio mensal vendido em cartões<input name="volume_mensal" inputMode="decimal" required /></label>
                <label>Número de adquirentes utilizadas<input name="numero_adquirentes" type="number" min="1" required /></label>
                <label className="fieldWide">Há quanto tempo sua empresa opera com cartões?
                  <select name="tempo_operacao" defaultValue="" required>
                    <option value="" disabled>Selecione</option><option>Menos de 1 ano</option><option>1 a 2 anos</option><option>2 a 3 anos</option><option>3 a 5 anos</option><option>Mais de 5 anos</option>
                  </select>
                </label>
              </div>
              <button type="submit" className="button buttonDark formButton" disabled={submitting}>{submitting ? "Enviando..." : "Solicitar análise"}</button>
              <p className="formStatus" role="status" aria-live="polite">{formStatus}</p>
            </form>
          </div>
        </section>

        <section className="section creamSection" id="grupo-coomarcas">
          <div className="container groupGrid">
            <div>
              <span className="eyebrow">Grupo Coomarcas</span>
              <h2 className="titleLg">Uma empresa do Grupo Coomarcas</h2>
              <p className="lead">A Conteii integra o Grupo Coomarcas, um ecossistema empresarial formado por marcas especializadas em diferentes áreas da gestão, inteligência, tecnologia e desenvolvimento de empresas.</p>
              <h3 className="titleMd">Diferentes especialidades. Uma mesma visão: usar conhecimento, dados e tecnologia para construir empresas melhores.</h3>
              <span className="button buttonDark nonInteractive">Conheça o Grupo Coomarcas</span>
            </div>
            <div className="groupSign"><div><img src="/symbol-conteii-orange.png" alt="Conteii" /><strong>CONTEII | GRUPO COOMARCAS</strong><span>Uma empresa do Grupo Coomarcas</span></div></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footerGrid">
            <div><img className="footerLogo" src="/logo-conteii-white.png" alt="Conteii" /><p>Auditoria e Recuperação de Recebíveis. Auditamos operações com adquirentes, identificamos divergências e buscamos recuperar os valores confirmados.</p></div>
            <div className="footerCol"><h3>Navegação</h3>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="#contato">Contato</a></div>
            <div className="footerCol"><h3>Contato</h3><span>WhatsApp</span><span>E-mail</span><span>LinkedIn</span><span>Instagram</span></div>
          </div>
          <div className="footerBottom"><span>© 2026 Conteii. Todos os direitos reservados.</span><span>Política de Privacidade | Termos de Uso | LGPD</span></div>
        </div>
      </footer>
    </div>
  );
}
