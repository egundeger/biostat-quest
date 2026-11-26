import { preferredLanguage, saveLanguage, questQuery } from "./quest-state.js";
import { createLab } from "./quest-lab.js";
import { createAcademy } from "./quest-academy.js";
import { caseDataLabel, caseDataValue, calculationSteps } from "./quest-language.js";

const text = {
  tr: {
    tagline: "Laboratuvar vakalarıyla biyoistatistik pratiği",
    lead: "Bir vaka seçkisini çözün, verileri yorumlayın ve her yanıttan sonra kararınızın gerekçesini inceleyin.",
    setup: "Oyun ayarları", language: "Dil", difficulty: "Düzey", levels: ["Kolay", "Orta", "Zor"],
    levelNotes: [
      "Temel testler ve istatistiksel kavramlar.",
      "Temel konularla birlikte daha kapsamlı endüstri vakaları.",
      "Tüm soru havuzu ve ileri düzey analizler.",
    ],
    questions: "Tur uzunluğu", count: "soru", quick: "Hızlı tur", full: "Tüm vakalar",
    start: "Turu başlat", newRun: "Yeni tur başlat", resume: "Kaldığın yerden devam et",
    study: "Formül ve çalışma rehberi", studyDetail: "Formüller, konu rehberleri ve arama",
    lab: "İstatistik araçları", labDetail: "Veri gir, hesapla, grafiği incele",
    medals: "Rozetler", medalDetail: "Koleksiyonunu ve hedefleri gör",
    academy: "BioStat Akademi", academyDetail: "Makaleler, interaktif grafikler ve Miller & Miller",
    deck: "Vaka havuzu", all: "Tüm vakalar", evidence: "Kaynaklı vakalar", fullRound: "Tam tur",
    pharma: "İlaç ve biyoteknoloji",
    duration: "Yaklaşık", minute: "dk", question: "Soru", source: "Kaynak",
    realData: "Yayımlanmış veri setinden uyarlanmıştır.", syntheticData: "Eğitim için oluşturulmuş örnek veri.",
    home: "Ana menü", level: "Seviye", accuracy: "Doğruluk", elapsed: "Süre",
    progress: "Tamamlanan sorular", data: "Vaka verileri", index: "Gözlem", field: "Değişken", value: "Değer",
    prompt: "Kararınız nedir?", confirm: "Yanıtı onayla", correct: "Doğru yanıt", incorrect: "Yanlış yanıt",
    continue: "Sonraki soru", finish: "Sonuçları gör", hint: "İpucu kullan", hintCost: "10 XP",
    hintUnavailable: "İpucu kullanmak için bu turda en az 10 XP gerekli.", hintTitle: "İpucu",
    calculation: "Analiz adımları", answerLabel: "Yanıt seçenekleri",
  },
  en: {
    tagline: "Practice biostatistics with lab cases",
    lead: "Work through lab cases, interpret the data, and review the reasoning after each answer.",
    setup: "Game settings", language: "Language", difficulty: "Difficulty", levels: ["Easy", "Medium", "Hard"],
    levelNotes: [
      "Core tests and statistical concepts.",
      "Foundational questions and more involved industry cases.",
      "The full question pool, including advanced analyses.",
    ],
    questions: "Session length", count: "questions", quick: "Quick round", full: "All cases",
    start: "Start round", newRun: "Start a new round", resume: "Resume round",
    study: "Formulas and study guide", studyDetail: "Search formulas and topic guides",
    lab: "Statistics tools", labDetail: "Enter data, calculate and plot",
    medals: "Badges", medalDetail: "See your collection and objectives",
    academy: "BioStat Academy", academyDetail: "Articles, interactive charts and Miller & Miller",
    deck: "Case pool", all: "All cases", evidence: "Referenced cases", fullRound: "Full round",
    pharma: "Pharma and biotech",
    duration: "About", minute: "min", question: "Question", source: "Source",
    realData: "Adapted from a published dataset.", syntheticData: "Sample data created for teaching.",
    home: "Main menu", level: "Level", accuracy: "Accuracy", elapsed: "Time",
    progress: "Questions completed", data: "Case data", index: "Observation", field: "Variable", value: "Value",
    prompt: "What would you conclude?", confirm: "Check answer", correct: "Correct answer", incorrect: "Incorrect answer",
    continue: "Next question", finish: "View results", hint: "Use hint", hintCost: "10 XP",
    hintUnavailable: "Earn at least 10 XP in this round to use a hint.", hintTitle: "Hint",
    calculation: "Analysis steps", answerLabel: "Answer options",
  },
};

const difficultyOrder = ["easy", "medium", "hard"];
const simpleArray = (value) => Array.isArray(value) && value.every((item) => item == null || typeof item !== "object");

export function caseDataRows(data, language) {
  const label = (key) => caseDataLabel(key, language);
  const scalar = (value) => caseDataValue(value, language);
  const entries = Object.entries(data ?? {});
  if (entries.length > 0 && entries.every(([, value]) => simpleArray(value))) {
    const width = Math.max(...entries.map(([, values]) => values.length));
    return {
      series: entries.map(([key]) => label(key)),
      rows: Array.from({ length: width }, (_, index) => [
        String(index + 1), ...entries.map(([, values]) => scalar(values[index])),
      ]),
    };
  }

  const rows = [];
  function visit(path, value) {
    if (simpleArray(value)) {
      rows.push([path, value.length ? value.map(scalar).join(" · ") : "—"]);
    } else if (value && typeof value === "object") {
      const children = Object.entries(value);
      if (!children.length) rows.push([path, "—"]);
      children.forEach(([key, child]) => visit(
        `${path} · ${Array.isArray(value) ? Number(key) + 1 : label(key)}`, child,
      ));
    } else {
      rows.push([path, scalar(value)]);
    }
  }
  entries.forEach(([key, value]) => visit(label(key), value));
  return { series: [], rows };
}

export function createQuestUI({ jsx, jsxs, react, useGame, useRoute, getScenarios }) {
  const { useCallback, useEffect, useRef, useState, useSyncExternalStore } = react;
  const decks = ["all", "evidence", "pharma"];
  const sizes = Object.fromEntries(decks.map((deck) => [
    deck, difficultyOrder.map((difficulty) => getScenarios("en", difficulty, deck).length),
  ]));
  const Tools = createLab({ jsx, jsxs, react, useGame, useRoute, languagePreference: preferredLanguage });
  const { Academy, AcademyLinks, CaseReading } = createAcademy({ jsx, jsxs, react, useGame, useRoute });

  function Setup() {
    const game = useGame();
    const [, navigate] = useRoute();
    const [language, setLanguage] = useState(() => preferredLanguage() ?? game.language);
    const [difficulty, setDifficulty] = useState(game.difficulty);
    const [deck, setDeck] = useState(() => {
      const requested = questQuery().get("deck");
      return decks.includes(requested) ? requested : decks.includes(game.deck) ? game.deck : "all";
    });
    const difficultyIndex = difficultyOrder.indexOf(difficulty);
    const maximum = sizes[deck][difficultyIndex];
    const minimum = Math.min(5, maximum);
    const [count, setCount] = useState(Math.min(game.questionCount, maximum));
    const copy = text[language];
    const hasRound = game.gameStatus === "playing";
    useEffect(() => { document.documentElement.lang = language; }, [language]);
    useEffect(() => { window.scrollTo(0, 0); }, []);

    function selectLanguage(next) {
      setLanguage(next);
      saveLanguage(next);
    }

    function begin() {
      saveLanguage(language);
      game.startGame(language, difficulty, count, deck);
      navigate("/play");
    }

    function selectPool(next) {
      const nextMaximum = sizes[next][difficultyIndex];
      setDeck(next);
      setCount(Math.max(Math.min(5, nextMaximum), Math.min(count, nextMaximum)));
    }

    function open(route) {
      saveLanguage(language);
      navigate(route);
    }

    return jsxs("main", { className: "quest-shell quest-setup", children: [
      jsxs("header", { className: "quest-intro", children: [
        jsx("h1", { children: "BioStat Quest" }),
        jsx("p", { className: "quest-tagline", children: copy.tagline }),
        jsx("p", { className: "quest-lead", children: copy.lead }),
      ] }),
      jsx("div", { className: "quest-portal", children: [
        ["▤", copy.study, copy.studyDetail, "/dashboard?tab=study"],
        ["◈", copy.lab, copy.labDetail, "/tools"],
        ["✦", copy.medals, copy.medalDetail, "/dashboard?tab=achievements"],
        ["⌬", copy.academy, copy.academyDetail, "/academy"],
      ].map(([symbol, title, detail, route]) => jsxs("button", {
        type: "button", className: "quest-portal-button", onClick: () => open(route),
        children: [jsx("span", { "aria-hidden": "true", children: symbol }),
          jsxs("div", { children: [jsx("strong", { children: title }), jsx("small", { children: detail })] })],
      }, route)) }),
      jsxs("section", { className: "quest-panel quest-config", "aria-label": copy.setup, children: [
        jsxs("div", { className: "quest-config-row", children: [
          jsxs("fieldset", { children: [
            jsx("legend", { children: copy.language }),
            jsx("div", { className: "quest-segments", children: [
              ["tr", "Türkçe"], ["en", "English"],
            ].map(([code, name]) => jsx("button", {
              type: "button", lang: code, "aria-pressed": language === code,
              onClick: () => selectLanguage(code), children: name,
            }, code)) }),
          ] }),
          jsxs("fieldset", { children: [
            jsx("legend", { children: copy.difficulty }),
            jsx("div", { className: "quest-segments", children: difficultyOrder.map((key, index) => jsx("button", {
              type: "button", "aria-pressed": difficulty === key, onClick: () => {
                setDifficulty(key);
                const nextMaximum = sizes[deck][index];
                setCount(Math.max(Math.min(5, nextMaximum), Math.min(count, nextMaximum)));
              }, children: copy.levels[index],
            }, key)) }),
            jsx("p", { className: "quest-help", children: copy.levelNotes[difficultyIndex] }),
          ] }),
        ] }),
        jsxs("fieldset", { className: "quest-pool", children: [
          jsx("legend", { children: copy.deck }),
          jsx("div", { className: "quest-segments", children: decks.map((key) => jsx("button", {
            type: "button", onClick: () => selectPool(key), "aria-pressed": deck === key,
            children: copy[key],
          }, key)) }),
        ] }),
        jsxs("div", { className: "quest-length", children: [
          jsxs("label", { htmlFor: "quest-question-count", children: [
            copy.questions, jsx("strong", { children: `${count} ${copy.count}` }),
          ] }),
          jsx("input", {
            id: "quest-question-count", type: "range", min: minimum, max: maximum, value: count, disabled: minimum === maximum,
            onChange: (event) => setCount(Number(event.target.value)),
          }),
          jsxs("div", { className: "quest-presets", children: [
            maximum > minimum && jsx("button", { type: "button", onClick: () => setCount(minimum), children: `${copy.quick} · ${minimum}` }),
            jsx("button", { type: "button", onClick: () => setCount(maximum), children: `${copy.fullRound} · ${maximum}` }),
          ] }),
        ] }),
        jsxs("div", { className: "quest-setup-actions", children: [
          jsx("span", { className: "quest-help", children: `${copy.duration} ${Math.ceil(count * 1.5)} ${copy.minute}` }),
          jsx("button", { type: "button", className: "quest-button quest-button-primary", onClick: hasRound ? () => navigate("/play") : begin, children: hasRound ? copy.resume : copy.start }),
          hasRound && jsx("button", { type: "button", className: "quest-button quest-button-quiet", onClick: begin, children: copy.newRun }),
        ] }),
      ] }),
    ] });
  }

  function DataTable({ data, copy, language }) {
    const { series, rows } = caseDataRows(data, language);
    if (!rows.length) return null;
    const headers = series.length ? [copy.index, ...series] : [copy.field, copy.value];
    return jsxs("section", { className: "quest-data", "aria-labelledby": "quest-data-title", children: [
      jsx("h3", { id: "quest-data-title", children: copy.data }),
      jsx("div", { className: "quest-table-scroll", tabIndex: 0, role: "region", "aria-label": copy.data, children:
        jsxs("table", { children: [
          jsx("thead", { children: jsx("tr", { children: headers.map((heading, index) =>
            jsx("th", { scope: "col", children: heading }, index)) }) }),
          jsx("tbody", { children: rows.map(([label, ...values], index) => jsxs("tr", { children: [
            jsx("th", { scope: "row", children: label }),
            ...values.map((value, column) => jsx("td", { children: value }, column)),
          ] }, index)) }),
        ] }),
      }),
    ] });
  }

  function Question({ scenario, game, copy, open }) {
    const recorded = game.history[game.currentIndex]?.id === scenario.id ? game.history[game.currentIndex] : null;
    const [selected, setSelected] = useState(recorded?.answerId ?? null);
    const [hintShown, showHint] = useState(false);
    const [feedback, setFeedback] = useState(() => recorded ? {
      correct: recorded.correct,
      xpGain: recorded.xpEarned,
      explanation: scenario.explanation,
    } : null);
    const submitted = useRef(Boolean(recorded));
    const feedbackRef = useRef(null);
    const titleRef = useRef(null);
    useEffect(() => {
      window.scrollTo(0, 0);
      titleRef.current?.focus({ preventScroll: true });
    }, []);

    function checkAnswer() {
      if (submitted.current || !selected) return;
      submitted.current = true;
      setFeedback(game.submitAnswer(selected));
      requestAnimationFrame(() => feedbackRef.current?.focus());
    }

    return jsxs("div", { className: "quest-workspace", children: [
      jsxs("section", { className: "quest-panel quest-case", "aria-labelledby": "quest-case-title", children: [
        jsxs("p", { className: "quest-case-label", children: [
          jsx("span", { children: scenario.topic }),
          jsx("span", { children: copy.levels[difficultyOrder.indexOf(scenario.difficulty)] }),
        ] }),
        jsx("h2", { id: "quest-case-title", tabIndex: -1, ref: titleRef, children: scenario.title }),
        jsx("p", { className: "quest-case-story", children: scenario.story }),
        scenario.source && jsx("p", { className: "quest-help", children: scenario.source.real ? copy.realData : copy.syntheticData }),
        jsx(DataTable, { data: scenario.data, copy, language: game.language }),
      ] }),
      jsxs("section", { className: "quest-panel quest-question", "aria-labelledby": "quest-question-title", children: [
        jsx("h3", { id: "quest-question-title", children: copy.prompt }),
        jsx("p", { className: "quest-question-text", children: scenario.question }),
        jsx("fieldset", { className: "quest-answers", disabled: Boolean(feedback), children: [
          jsx("legend", { className: "quest-sr-only", children: copy.answerLabel }),
          ...scenario.options.map((option, index) => jsxs("label", {
            className: "quest-answer",
            "data-result": feedback ? option.correct ? "correct" : selected === option.id ? "incorrect" : undefined : undefined,
            children: [
              jsx("input", { type: "radio", name: "quest-answer", value: option.id, checked: selected === option.id, onChange: () => setSelected(option.id) }),
              jsx("span", { className: "quest-option-letter", "aria-hidden": "true", children: String.fromCharCode(65 + index) }),
              jsx("span", { children: option.text.replace(/\s*[✓✔]\s*$/u, "") }),
              feedback && option.correct && jsx("span", { className: "quest-sr-only", children: copy.correct }),
              feedback && selected === option.id && !option.correct && jsx("span", { className: "quest-sr-only", children: copy.incorrect }),
            ],
          }, option.id)),
        ] }),
        !feedback && scenario.hint && (hintShown
          ? jsxs("p", { className: "quest-hint", children: [jsx("strong", { children: copy.hintTitle }), " ", scenario.hint] })
          : jsxs("div", { className: "quest-hint-control", children: [
            jsx("button", {
              type: "button", className: "quest-button quest-button-quiet", disabled: game.xp < 10,
              onClick: () => { if (game.useHint()) showHint(true); },
              children: `${copy.hint} · ${copy.hintCost}`,
            }),
            game.xp < 10 && jsx("p", { className: "quest-help", children: copy.hintUnavailable }),
          ] })),
        !feedback && jsx("button", {
          type: "button", className: "quest-button quest-button-primary quest-next", disabled: !selected,
          onClick: checkAnswer, children: copy.confirm,
        }),
        feedback && jsxs("div", { className: "quest-feedback-stack", children: [
          jsxs("div", { className: "quest-feedback", "data-result": feedback.correct ? "correct" : "incorrect", tabIndex: -1, ref: feedbackRef, children: [
            jsx("strong", { children: feedback.correct ? `${copy.correct} · +${feedback.xpGain} XP` : copy.incorrect }),
            jsx("p", { children: feedback.explanation }),
            scenario.source && jsxs("p", { className: "quest-source", children: [
              copy.source + " · ", jsx("a", { href: scenario.source.url, target: "_blank", rel: "noopener", children: scenario.source.label }),
            ] }),
          ] }),
          jsx("button", {
            type: "button", className: "quest-button quest-button-primary quest-next", onClick: game.nextQuestion,
            children: game.currentIndex === game.scenarios.length - 1 ? copy.finish : copy.continue,
          }),
          jsx(CaseReading, { scenario, language: game.language, open }),
          scenario.calcType && jsx(Calculation, { scenario, language: game.language, label: copy.calculation }),
        ] }),
      ] }),
    ] });
  }

  function Calculation({ scenario, language, label }) {
    const steps = calculationSteps(scenario.calcType, language);
    if (!steps) return null;
    return jsxs("details", { className: "quest-calculation", children: [
      jsx("summary", { children: label }),
      jsx("ol", { className: "quest-calculation-log", children: steps.map((step) => jsx("li", { children: step }, step)) }),
    ] });
  }

  function Play() {
    const game = useGame();
    const [, navigate] = useRoute();
    const copy = text[game.language];
    const [seconds, setSeconds] = useState(0);
    const active = game.gameStatus === "playing";
    useEffect(() => {
      document.documentElement.lang = game.language;
      if (!active) {
        navigate(game.gameStatus === "finished" ? "/dashboard" : "/");
        return;
      }
      const tick = () => setSeconds(Math.max(0, Math.floor((Date.now() - game.startTime) / 1000)));
      tick();
      const timer = window.setInterval(tick, 1000);
      return () => window.clearInterval(timer);
    }, [active, game.gameStatus, game.language, game.startTime, navigate]);
    const scenario = game.scenarios[game.currentIndex];
    if (!active || !scenario) return null;

    const answered = game.history.length;
    const score = answered ? new Intl.NumberFormat(game.language, { style: "percent" }).format(game.correctCount / answered) : "—";
    const elapsed = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
    const stats = [["XP", game.xp], [copy.level, Math.floor(game.xp / 100) + 1], [copy.accuracy, score], [copy.elapsed, elapsed]];
    return jsxs("main", { className: "quest-shell quest-play", children: [
      jsxs("header", { className: "quest-game-header", children: [
        jsxs("div", { children: [
          jsx("p", { className: "quest-wordmark", children: "BioStat Quest" }),
          jsx("h1", { children: `${copy.question} ${game.currentIndex + 1} / ${game.scenarios.length}` }),
        ] }),
        jsx("button", { type: "button", className: "quest-button quest-button-quiet", onClick: () => navigate("/"), children: copy.home }),
      ] }),
      jsx("progress", { className: "quest-progress", value: answered, max: game.scenarios.length, "aria-label": copy.progress }),
      jsx("dl", { className: "quest-stats", children: stats.map(([label, value]) => jsxs("div", { children: [
        jsx("dt", { children: label }), jsx("dd", { children: value }),
      ] }, label)) }),
      jsx(Question, { scenario, game, copy, open: navigate }, scenario.id),
    ] });
  }

  function usePortableRoute() {
    const fragment = useSyncExternalStore(
      (listener) => { window.addEventListener("hashchange", listener); return () => window.removeEventListener("hashchange", listener); },
      () => window.location.hash.slice(1) || "/",
    );
    const navigate = useCallback((route) => { window.location.hash = route; }, []);
    return [fragment.split("?")[0], navigate];
  }

  return { Setup, Play, Tools, Academy, AcademyLinks, usePortableRoute };
}
