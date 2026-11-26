const copy = {
  tr: {
    title: "İstatistik laboratuvarı", lead: "Örnek veriyi değiştirin ve sonuçların nasıl değiştiğini görün.",
    home: "Ana menü", tabs: ["Tanımlayıcı", "Risk karşılaştırması", "Holm düzeltmesi", "Bland–Altman"],
    compute: "Hesapla", example: "Örneği yükle", invalid: "Girdileri kontrol edin. Sayıları boşluk veya yeni satırla ayırın.",
    numbers: "Ölçümler", numHelp: "Sayıları boşluk, noktalı virgül veya yeni satırla ayırın. Ondalık ayıracı nokta veya virgül olabilir.",
    metrics: ["n", "Ortalama", "Medyan", "Örneklem standart sapması", "CV", "Min – Maks"],
    cvNote: "Örneklem varyansı n − 1 kullanılarak hesaplanır. Varyasyon katsayısı (CV), anlamlı sıfır noktası olan ve ortalaması sıfırdan uzak, pozitif veriler için yorumlanır.",
    riskInputs: ["A · olay", "A · olay yok", "B · olay", "B · olay yok"],
    riskMetrics: ["A riski", "B riski", "Risk oranı (A/B)", "Risk farkı (A − B)", "Odds oranı (A/B)"],
    riskNote: "Odds, olay olasılığının olay olmama olasılığına oranıdır. Her grupta en az bir gözlem olmalı. Paydası sıfır olan oranlar için — gösterilir.",
    points: "yüzde puan", holmInput: "Ham p değerleri", alpha: "Aile düzeyi α",
    holmHeaders: ["Test", "Ham p", "Düzeltilmiş p", "Karar"], rejected: "H₀ reddedilir", retained: "H₀ reddedilemez",
    holmNote: "Düzeltilmiş p ≤ α ise ilgili H₀ reddedilir. Sıra, girdi sırasıdır.",
    pairs: ["Yöntem A ölçümleri", "Yöntem B ölçümleri"], pairsNote: "İki liste aynı uzunlukta olmalı. Her sırada aynı örnek ölçülmüş olmalı.",
    agreementMetrics: ["Ortalama fark A − B", "Farkların SS’si", "Alt uyum sınırı", "Üst uyum sınırı"],
    agreementNote: "Yaklaşık %95 uyum sınırı = ortalama fark ± 1,96 × SS. Farkların dağılımını ve ölçüm düzeyine göre değişimini inceleyin.",
    chart: "X ekseni iki yöntemin ortalaması. Y ekseni A − B farkı. Çizgiler ortalama farkı ve uyum sınırlarını gösterir.",
    sources: "Yöntem kaynağı",
  },
  en: {
    title: "Statistics lab", lead: "Change the sample data and see how the results respond.",
    home: "Main menu", tabs: ["Descriptives", "Compare risks", "Holm adjustment", "Bland–Altman"],
    compute: "Calculate", example: "Load example", invalid: "Check your input. Separate numbers with spaces or line breaks.",
    numbers: "Measurements", numHelp: "Separate numbers with spaces, semicolons, or line breaks. Decimal points and decimal commas are accepted.",
    metrics: ["n", "Mean", "Median", "Sample SD", "CV", "Min – Max"],
    cvNote: "Sample SD uses n − 1. CV is interpretable on a ratio scale with a meaningful zero.",
    riskInputs: ["A · events", "A · no event", "B · events", "B · no event"],
    riskMetrics: ["Risk in A", "Risk in B", "Risk ratio (A/B)", "Risk difference (A − B)", "Odds ratio (A/B)"],
    riskNote: "Odds are the probability of the event divided by the probability of no event. Each group needs at least one observation. A ratio with a zero denominator is shown as —.",
    points: "percentage points", holmInput: "Raw p-values", alpha: "Family-wise α",
    holmHeaders: ["Test", "Raw p", "Adjusted p", "Decision"], rejected: "Reject H₀", retained: "Do not reject H₀",
    holmNote: "Reject each H₀ when its adjusted p-value is ≤ α. Rows follow input order.",
    pairs: ["Method A measurements", "Method B measurements"], pairsNote: "Lists must have the same length and match specimen by specimen.",
    agreementMetrics: ["Mean difference A − B", "SD of differences", "Lower agreement limit", "Upper agreement limit"],
    agreementNote: "Approximate 95% limits of agreement = mean difference ± 1.96 × SD. Check the distribution of differences and how they vary with measurement size.",
    chart: "The x-axis is the mean of the two methods and the y-axis is A − B. Lines show the mean difference and agreement limits.",
    sources: "Method reference",
  },
};

const labReferences = [
  ["OpenIntro Statistics", "https://www.openintro.org/book/os/"],
  ["Penn State STAT 509", "https://online.stat.psu.edu/stat509/Lesson06"],
  ["R stats · p.adjust", "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/p.adjust.html"],
  ["Bland & Altman · The Lancet", "https://pubmed.ncbi.nlm.nih.gov/2868172/"],
];

const examples = [
  ["98 99 100 101 102"], ["12", "88", "24", "76"], ["0.003 0.017 0.032 0.18", "0.05"],
  ["12 15 17 21 26 30", "11 15 15 19 23 29"],
];

function number(text) {
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?$/.test(text.trim())) throw Error("number");
  const value = Number(text.trim().replace(",", "."));
  if (!Number.isFinite(value) || Math.abs(value) > 1e100) throw Error("number");
  return value;
}

export function numberList(text, minimum = 2) {
  const values = text.trim().split(/[\s;]+/).map(number);
  if (values.length < minimum || values.length > 500) throw Error("length");
  return values;
}

function descriptive(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((sum, value) => sum + value, 0) / n;
  const median = (sorted[Math.floor((n - 1) / 2)] + sorted[Math.ceil((n - 1) / 2)]) / 2;
  const sd = Math.sqrt(sorted.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (n - 1));
  return { n, mean, median, sd, cv: mean > 0 ? 100 * sd / mean : null, min: sorted[0], max: sorted[n - 1] };
}

export function calculateLab(tab, values) {
  if (tab === 0) return descriptive(numberList(values[0]));
  if (tab === 1) {
    const [a, b, c, d] = values.map(number);
    if ([a, b, c, d].some((x) => !Number.isSafeInteger(x) || x < 0 || x > 1e9) || !a && !b || !c && !d) throw Error("counts");
    const riskA = a / (a + b);
    const riskB = c / (c + d);
    return { riskA, riskB, rr: riskB > 0 ? riskA / riskB : null, rd: riskA - riskB, or: b * c > 0 ? a * d / (b * c) : null };
  }
  if (tab === 2) {
    const alpha = number(values[1]);
    const p = numberList(values[0], 1);
    if (alpha <= 0 || alpha >= 1 || p.some((x) => x < 0 || x > 1)) throw Error("probability");
    const sorted = p.map((value, i) => ({ value, i })).sort((a, b) => a.value - b.value);
    const adjusted = Array(p.length);
    let running = 0;
    sorted.forEach(({ value, i }, rank) => {
      running = Math.min(1, Math.max(running, (p.length - rank) * value));
      adjusted[i] = { p: value, adjusted: running, reject: running <= alpha };
    });
    return adjusted;
  }
  if (tab !== 3) throw Error("tool");
  const a = numberList(values[0]);
  const b = numberList(values[1]);
  if (a.length !== b.length) throw Error("paired length");
  const pairs = a.map((x, i) => [(x + b[i]) / 2, x - b[i]]);
  const result = descriptive(pairs.map((pair) => pair[1]));
  return { pairs, mean: result.mean, sd: result.sd, lower: result.mean - 1.96 * result.sd, upper: result.mean + 1.96 * result.sd };
}

export function createLab({ jsx, jsxs, react, useRoute, useGame, languagePreference }) {
  const { useEffect, useState } = react;

  function AgreementChart({ result, caption }) {
    const x = result.pairs.map(([xValue]) => xValue);
    const y = result.pairs.map(([, yValue]) => yValue);
    const xMin = Math.min(...x), xMax = Math.max(...x);
    const yMin = Math.min(result.lower, ...y), yMax = Math.max(result.upper, ...y);
    const scale = (point, min, max) => max === min ? 50 : 5 + 90 * (point - min) / (max - min);
    return jsxs("figure", { className: "lab-chart", children: [
      jsxs("div", { className: "lab-plot", "aria-hidden": "true", children: [
        ...[result.lower, result.mean, result.upper].map((value, i) => jsx("i", { className: "lab-plot-line", "data-mean": i === 1, style: { bottom: scale(value, yMin, yMax) + "%" } }, i)),
        ...result.pairs.map(([xValue, yValue], i) => jsx("b", { style: {
          left: scale(xValue, xMin, xMax) + "%", bottom: scale(yValue, yMin, yMax) + "%",
        } }, i)),
      ] }),
      jsx("figcaption", { children: caption }),
    ] });
  }

  function Tools() {
    const game = useGame();
    const language = languagePreference() ?? game.language;
    const ui = copy[language];
    const [, navigate] = useRoute();
    const [tab, changeTab] = useState(0);
    const [values, setValues] = useState(examples[0]);
    const [result, setResult] = useState(() => calculateLab(0, examples[0]));
    const [error, setError] = useState(false);
    const nf = new Intl.NumberFormat(language, { maximumFractionDigits: 4, useGrouping: false });
    const pf = new Intl.NumberFormat(language, { notation: "scientific", maximumFractionDigits: 4, useGrouping: false });
    const fmt = (value) => value == null ? "—" : value !== 0 && (Math.abs(value) < 0.0001 || Math.abs(value) >= 1e9) ? pf.format(value) : nf.format(value);
    const percent = new Intl.NumberFormat(language, { style: "percent", maximumFractionDigits: 2 });
    const [refName, refUrl] = labReferences[tab];
    useEffect(() => { document.documentElement.lang = language; window.scrollTo(0, 0); }, [language]);

    function run(which, next) {
      try {
        setResult(calculateLab(which, next));
        setError(false);
      } catch {
        setResult(null);
        setError(true);
      }
    }
    function select(which) {
      changeTab(which);
      setValues(examples[which]);
      run(which, examples[which]);
    }
    function field(label, index, multiline) {
      const props = {
        value: values[index], inputMode: multiline ? undefined : "decimal", autoComplete: "off", maxLength: multiline ? 12000 : 32,
        onChange(event) {
          setValues(values.map((value, j) => j === index ? event.target.value : value));
          setResult(null);
          setError(false);
        },
      };
      return jsxs("label", { children: [jsx("span", { children: label }), jsx(multiline ? "textarea" : "input", multiline ? { ...props, rows: 3 } : props)] }, index);
    }
    let metrics = [];
    if (tab === 0 && result) metrics = ui.metrics.map((name, i) => [name, [
      fmt(result.n), fmt(result.mean), fmt(result.median), fmt(result.sd), result.cv == null ? "—" : percent.format(result.cv / 100), fmt(result.min) + " – " + fmt(result.max),
    ][i]]);
    if (tab === 1 && result) metrics = ui.riskMetrics.map((name, i) => [name, [
      percent.format(result.riskA), percent.format(result.riskB), fmt(result.rr), fmt(100 * result.rd) + " " + ui.points, fmt(result.or),
    ][i]]);
    if (tab === 3 && result) metrics = ui.agreementMetrics.map((name, i) => [name, fmt([result.mean, result.sd, result.lower, result.upper][i])]);

    return jsxs("main", { className: "quest-shell quest-lab", children: [
      jsxs("header", { className: "quest-game-header", children: [
        jsxs("div", { children: [jsx("p", { className: "quest-wordmark", children: "BioStat Quest" }), jsx("h1", { children: ui.title })] }),
        jsx("button", { className: "quest-button quest-button-quiet", onClick: () => navigate("/"), children: ui.home }),
      ] }),
      jsx("p", { className: "quest-lab-lead", children: ui.lead }),
      jsx("div", { className: "quest-segments lab-tabs", children: ui.tabs.map((name, i) => jsx("button", {
        type: "button", "aria-pressed": tab === i, onClick: () => select(i), children: name,
      }, name)) }),
      jsxs("section", { className: "quest-panel lab-panel", "aria-label": ui.tabs[tab], children: [
        jsxs("form", { className: "lab-form", onSubmit(event) { event.preventDefault(); run(tab, values); }, children: [
          jsx("div", { className: "lab-fields", children: tab === 0 ? field(ui.numbers, 0, true)
            : tab === 1 ? ui.riskInputs.map((label, i) => field(label, i, false))
            : tab === 2 ? [field(ui.holmInput, 0, true), field(ui.alpha, 1, false)]
            : ui.pairs.map((label, i) => field(label, i, true)) }),
          tab !== 1 && jsx("p", { className: "quest-help", children: ui.numHelp }),
          tab === 3 && jsx("p", { className: "quest-help", children: ui.pairsNote }),
          jsxs("div", { className: "lab-actions", children: [
            jsx("button", { type: "submit", className: "quest-button quest-button-primary", children: ui.compute }),
            jsx("button", { type: "button", className: "quest-button quest-button-quiet", onClick: () => select(tab), children: ui.example }),
          ] }),
        ] }),
        error && jsx("p", { className: "quest-feedback", "data-result": "incorrect", role: "alert", children: ui.invalid }),
        jsxs("div", { className: "lab-results", "aria-live": "polite", children: [
          metrics.length > 0 && jsx("dl", { className: "lab-metrics", children: metrics.map(([label, value]) =>
            jsxs("div", { children: [jsx("dt", { children: label }), jsx("dd", { children: value })] }, label)) }),
          tab === 2 && result && jsx("div", { className: "quest-table-scroll", children: jsxs("table", { children: [
            jsx("thead", { children: jsx("tr", { children: ui.holmHeaders.map((label) => jsx("th", { scope: "col", children: label }, label)) }) }),
            jsx("tbody", { children: result.map((row, i) => jsxs("tr", { children: [
              jsx("th", { scope: "row", children: i + 1 }), jsx("td", { children: fmt(row.p) }),
              jsx("td", { children: fmt(row.adjusted) }), jsx("td", { children: row.reject ? ui.rejected : ui.retained }),
            ] }, i)) }),
          ] }) }),
          tab === 3 && result && jsx(AgreementChart, { result, caption: ui.chart }),
        ] }),
        jsx("p", { className: "quest-help", children: [ui.cvNote, ui.riskNote, ui.holmNote, ui.agreementNote][tab] }),
        jsxs("p", { className: "lab-reference", children: [
          ui.sources + " · ", jsx("a", { href: refUrl, target: "_blank", rel: "noopener", children: refName }),
        ] }),
      ] }),
    ] });
  }

  return Tools;
}
