import { academyReferences, academyArticles, millerReading } from "./quest-academy-content.js";
import { academyCharts, createAcademyCharts } from "./quest-academy-charts.js";
import { questQuery, preferredLanguage } from "./quest-state.js";

const academyCopy = {
  tr: {
    title: "BioStat Akademi", lead: "İlaç ve biyoteknoloji istatistiğini, deney tasarımından ruhsat dosyasına kadar örneklerle inceleyin.",
    tabs: ["Uygulama makaleleri", "İnteraktif grafikler", "Miller & Miller"],
    menu: "Ana menü", resume: "Tura dön", play: "İlaç ve biyoteknoloji vakalarını çöz",
    tool: "İstatistik laboratuvarını aç", topics: "Konu seçin", sources: "Kaynaklar",
    chart: "İlgili grafiği aç", read: "İlgili makaleyi oku", chapter: "Bölüm",
    readingLead: "James N. Miller ve Jane C. Miller’ın 7. baskısı için okuma rehberi. Bölüm bağlantılarıyla kitaptaki yöntemleri oyunda ve uygulama makalelerinde bulunan örneklerle eşleştirin.",
    excerpt: "Kitaptan kısa alıntı", cite: "Miller & Miller · 7. baskı, §1.6",
    book: "Kitabın önizlemesini aç", caseLabel: "Yöntemin uygulamasını oku",
    caseNote: "Bu yöntemin neden kullanıldığını ve ilaç veya biyoteknolojide nasıl yorumlandığını inceleyin.",
  },
  en: {
    title: "BioStat Academy", lead: "Explore pharma and biotechnology statistics from experimental design to the regulatory dossier.",
    tabs: ["Applied articles", "Interactive charts", "Miller & Miller"],
    menu: "Main menu", resume: "Return to round", play: "Play pharma and biotech cases",
    tool: "Open the statistics lab", topics: "Choose a topic", sources: "References",
    chart: "Open related chart", read: "Read related article", chapter: "Chapter",
    readingLead: "A reading guide to the seventh edition by James N. Miller and Jane C. Miller. Connect the book’s chapters to methods used in the game and applied articles.",
    excerpt: "Short quotation from the book", cite: "Miller & Miller · 7th edition, §1.6",
    book: "Open the book preview", caseLabel: "Read about this method",
    caseNote: "See why this method is used and how it is interpreted in pharma or biotechnology.",
  },
};

const chartForArticle = { analytical: "calibration", doe: "doe", manufacturing: "spc", abe: "abe", pbe: "pbe" };

export function articleForScenario(scenario) {
  if (Object.hasOwn(academyArticles, scenario.article)) return scenario.article;
  const heading = (scenario.id + " " + scenario.topic).toLocaleLowerCase("tr");
  if (/\bpbe\b|in vitro/.test(heading)) return "pbe";
  if (/eşdeğer|equivalen/.test(heading)) return "abe";
  if (/capability|cpk|yeterlilik|quality control|kalite kontrol/.test(heading)) return "manufacturing";
  if (/factorial|faktöriyel|doe|etkileşim|response surface/.test(heading)) return "doe";
  if (/agreement|bland|regress|kalibrasyon|validation|doğrulama|repeatability|tekrarlan/.test(heading)) return "analytical";
  return "research";
}

export function createAcademy({ jsx, jsxs, react, useRoute, useGame }) {
  const { useEffect, useState } = react;
  const Charts = createAcademyCharts({ jsx, jsxs, react });

  function sourceLink(id, label) {
    const [title, url] = academyReferences[id];
    return jsx("a", { href: url, target: "_blank", rel: "noreferrer noopener", children: label ?? title });
  }

  function AcademyLinks({ language }) {
    const [, navigate] = useRoute();
    const ui = academyCopy[language];
    return jsx("div", { className: "academy-guide-links",
      children: [["articles", ui.tabs[0]], ["charts", ui.tabs[1]], ["reference", ui.tabs[2]]].map(([view, label]) =>
        jsx("button", { type: "button", className: "quest-button quest-button-quiet", onClick: () => navigate("/academy?view=" + view), children: label }, view)
      ),
    });
  }

  function CaseReading({ scenario, language, open }) {
    const ui = academyCopy[language];
    return jsxs("div", { className: "academy-case-reading", children: [
      jsx("p", { children: ui.caseNote }),
      jsx("button", { type: "button", className: "quest-button quest-button-quiet",
        onClick: () => open("/academy?view=articles&article=" + articleForScenario(scenario)), children: ui.caseLabel }),
    ] });
  }

  function Academy() {
    const game = useGame();
    const language = game.gameStatus === "playing" ? game.language : preferredLanguage() ?? game.language;
    const i = language === "tr" ? 0 : 1;
    const ui = academyCopy[language];
    const [, navigate] = useRoute();
    const views = ["articles", "charts", "reference"];
    const query = questQuery();
    const requested = query.get("view");
    const [view, setView] = useState(() => views.includes(requested) ? requested : "articles");
    const [article, setArticle] = useState(() => Object.hasOwn(academyArticles, query.get("article")) ? query.get("article") : "analytical");
    const [chart, setChart] = useState(() => Object.hasOwn(academyCharts, query.get("chart")) ? query.get("chart") : "doe");
    const selected = academyArticles[article];
    useEffect(() => { document.documentElement.lang = language; window.scrollTo(0, 0); }, [language]);

    function switchView(which) {
      setView(which);
    }

    return jsxs("main", { className: "quest-shell quest-academy", children: [
      jsxs("header", { className: "quest-game-header", children: [
        jsxs("div", { children: [jsx("p", { className: "quest-wordmark", children: "BioStat Quest" }), jsx("h1", { children: ui.title })] }),
        jsx("button", { type: "button", className: "quest-button quest-button-quiet",
          onClick: () => navigate(game.gameStatus === "playing" ? "/play" : "/"),
          children: game.gameStatus === "playing" ? ui.resume : ui.menu }),
      ] }),
      jsx("p", { className: "quest-lab-lead", children: ui.lead }),
      jsx("nav", { className: "quest-segments academy-tabs", "aria-label": ui.title, children: views.map((key, index) => jsx("button", {
        type: "button", "aria-pressed": key === view, onClick: () => switchView(key), children: ui.tabs[index],
      }, key)) }),
      view === "articles" && jsxs("div", { className: "academy-columns", children: [
        jsxs("aside", { className: "academy-contents quest-panel", "aria-label": ui.topics, children: [
          jsx("h2", { children: ui.topics }),
          jsx("div", { children: Object.entries(academyArticles).map(([key, content]) => jsx("button", {
            type: "button", "aria-pressed": key === article, onClick: () => setArticle(key), children: content.title[i],
          }, key)) }),
        ] }),
        jsxs("article", { className: "academy-reading quest-panel", children: [
          jsx("h2", { children: selected.title[i] }),
          jsx("p", { className: "quest-lab-lead", children: selected.summary[i] }),
          ...selected.sections.map(([title, prose]) => jsxs("section", { children: [
            jsx("h3", { children: title[i] }), jsx("p", { children: prose[i] }),
          ] }, title[i])),
          jsxs("section", { className: "academy-sources", children: [
            jsx("h3", { children: ui.sources }),
            jsx("ul", { children: selected.refs.map((key) => jsx("li", { children: sourceLink(key) }, key)) }),
          ] }),
          chartForArticle[article] && jsx("button", { className: "quest-button quest-button-primary", type: "button",
            onClick: () => { setChart(chartForArticle[article]); switchView("charts"); window.scrollTo(0, 0); }, children: ui.chart }),
        ] }),
      ] }),
      view === "charts" && jsx(Charts, { language, active: chart, select: setChart, sourceLink }),
      view === "reference" && jsxs("section", { className: "academy-reading quest-panel", children: [
        jsx("h2", { children: "Miller & Miller · 7" + (language === "tr" ? ". baskı" : "th edition") }),
        jsx("p", { className: "quest-lab-lead", children: ui.readingLead }),
        jsxs("figure", { className: "academy-quote", children: [
          jsx("div", { className: "quest-help", children: ui.excerpt }),
          jsx("blockquote", { lang: "en", children: "But statistical concepts also feature in the planning and design of experiments." }),
          jsx("figcaption", { children: sourceLink("miller", ui.cite) }),
        ] }),
        jsx("ol", { className: "academy-chapters", children: millerReading.map(({ chapter, title, note, article: next }) => jsxs("li", { children: [
          jsx("div", { className: "quest-help", children: ui.chapter + " " + chapter }),
          jsx("h3", { children: title[i] }),
          jsx("p", { children: note[i] }),
          jsx("button", { className: "quest-button quest-button-quiet", type: "button",
            onClick: () => { setArticle(next); switchView("articles"); window.scrollTo(0, 0); }, children: ui.read }),
        ] }, chapter)) }),
        jsx("p", { className: "academy-ref", children: sourceLink("miller", ui.book) }),
      ] }),
      jsxs("div", { className: "academy-actions", children: [
        jsx("button", { className: "quest-button quest-button-primary", type: "button",
          onClick: () => navigate("/?deck=pharma"), children: ui.play }),
        jsx("button", { className: "quest-button quest-button-quiet", type: "button",
          onClick: () => navigate("/tools"), children: ui.tool }),
      ] }),
    ] });
  }

  return { Academy, AcademyLinks, CaseReading };
}
