export const academyCharts = {
  doe: ["DoE yanıt yüzeyi", "DoE response surface"],
  spc: ["Proses kontrol grafiği", "Process control chart"],
  abe: ["ABE güven aralığı", "ABE confidence interval"],
  pbe: ["PBE · Ortalama ve varyans", "PBE · Mean and variance"],
  calibration: ["Kalibrasyon artıkları", "Calibration residuals"],
};

const chartDetails = {
  tr: {
    label: "Grafik seçin", doeAxes: ["Faktör A (kodlu)", "Faktör B (kodlu)"], response: "Tahmini yanıt",
    doeNote: "Faktörleri −1 ile +1 arasında değiştirin. Eğrilik ve etkileşim birlikte çalışır. Açık renk yüksek tahmini yanıtı gösterir.",
    doeSource: "Temsili eğitim modeli 85 + 6A − 3B − 5A² − 4B² + 4AB.",
    spcLabel: "Son ölçüm", spcNote: "Başlangıç merkezi 100, eğitim için varsayılan standart sapma 2. Kesikli çizgiler 94 ve 106 kontrol sınırlarını gösterir. Ürün spesifikasyonu bu örnekte 90–110.",
    spcStatus: ["Son ölçüm kontrol sınırları içinde.", "Son ölçüm kontrol sinyali veriyor."],
    spcSpec: ["Ürün spesifikasyonu içinde", "Ürün spesifikasyonu dışında"],
    spcX: "Ölçüm sırası", spcY: "Ölçüm değeri",
    ratio: "Test/karşılaştırıcı geometrik ortalama oranı", width: "Logaritmik ölçekte yarı genişlik",
    ci: "%90 güven aralığı", abeNote: "Standart M13A örneği · Aralığın tamamı %80,00–%125,00 içinde olmalı.",
    abeStatus: ["Bu örnekte aralık sınırlar içinde.", "Bu örnekte aralık sınırların dışına taşıyor."],
    abeExamples: ["Sınırlar içinde", "Geniş aralık", "Merkez kayması"],
    pbeInput: ["Test ortalama kayması", "Test standart sapması"], pbeRef: "Referans",
    pbeTest: "Test", pbeX: "Temsili ölçüm", pbeY: "Yoğunluk",
    pbeNote: "Referans ürünün ortalaması 100, standart sapması 3. Test ürününün ortalaması ve yayılımı ayrı ayrı değiştirilebilir. Grafik bu iki özelliğin dağılımı nasıl etkilediğini gösterir.",
    noise: "Artık saçılımı", changing: "Konsantrasyonla büyüyen hata",
    calX: "Konsantrasyon (temsili)", calY: "Artık",
    calNote: "Yüksek R² ile birlikte yelpaze biçimli artıklar görülebilir. Modeli amaç, artıklar ve bağımsız kalite kontrol örnekleriyle değerlendirin.",
    actual: "Girdi", limits: "Limitler", source: "Yöntem kaynağı",
  },
  en: {
    label: "Choose a chart", doeAxes: ["Factor A (coded)", "Factor B (coded)"], response: "Predicted response",
    doeNote: "Move the factors from −1 to +1. Curvature and interaction operate together. Lighter cells show a higher predicted response.",
    doeSource: "Illustrative teaching model 85 + 6A − 3B − 5A² − 4B² + 4AB.",
    spcLabel: "Latest measurement", spcNote: "Baseline center 100 and known teaching SD 2. Dashed control limits are 94 and 106. The example specifications are 90–110.",
    spcStatus: ["The last value is within control limits.", "The last value is a control signal."],
    spcSpec: ["Within example specifications", "Outside example specifications"],
    spcX: "Measurement order", spcY: "Measurement value",
    ratio: "Test / comparator ratio", width: "Half-width on the log scale",
    ci: "90% confidence interval", abeNote: "Standard M13A example · The entire interval must be within 80.00%–125.00%.",
    abeStatus: ["The interval meets the illustrated limits.", "The interval crosses the illustrated limits."],
    abeExamples: ["Within limits", "Wide interval", "Shifted center"],
    pbeInput: ["Test mean shift", "Test standard deviation"], pbeRef: "Reference",
    pbeTest: "Test", pbeX: "Illustrative measurement", pbeY: "Density",
    pbeNote: "The reference mean is 100 and SD 3. The test center and spread can move separately. These distributions illustrate why both matter in PBE, without computing a PBE decision.",
    noise: "Residual spread", changing: "Increase error with concentration",
    calX: "Concentration (illustrative)", calY: "Residual",
    calNote: "A high R² can coexist with funnel-shaped residuals. Evaluate the model using intended use, residuals and independent QC samples.",
    actual: "Input", limits: "Limits", source: "Method reference",
  },
};

export function responseAt(a, b) {
  return 85 + 6 * a - 3 * b - 5 * a ** 2 - 4 * b ** 2 + 4 * a * b;
}

export function abeInterval(ratioPercent, halfWidth) {
  const lower = ratioPercent * Math.exp(-halfWidth);
  const upper = ratioPercent * Math.exp(halfWidth);
  return { lower, upper, inside: lower >= 80 && upper <= 125 };
}

function normalDensity(x, mean, sd) {
  return Math.exp(-0.5 * ((x - mean) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
}

export function calibrationResiduals(scale, fanning) {
  const dx = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const noise = [-0.7, 0.9, -0.8, 0.6, -0.9, 1.0, -0.85, 0.7, -0.75, 0.85];
  const dy = dx.map((x, i) => 5 + 18 * x + noise[i] * scale * (fanning ? 0.3 * x : 1));
  const mx = dx.reduce((a, b) => a + b, 0) / dx.length;
  const my = dy.reduce((a, b) => a + b, 0) / dy.length;
  const slope = dy.reduce((sum, y, i) => sum + (y - my) * (dx[i] - mx), 0) / dx.reduce((sum, x) => sum + (x - mx) ** 2, 0);
  const intercept = my - slope * mx;
  const model = dy.map((y, i) => [dx[i], y - (intercept + slope * dx[i])]);
  const r2 = 1 - model.reduce((sum, [, error]) => sum + error ** 2, 0) / dy.reduce((sum, y) => sum + (y - my) ** 2, 0);
  return { model, slope, r2 };
}

export function createAcademyCharts({ jsx, jsxs, react }) {
  const { useEffect, useRef, useState } = react;

  function Plot({ xMin, xMax, yMin, yMax, curves, rules, axes }) {
    const canvas = useRef(null);
    useEffect(() => {
      const node = canvas.current;
      const ctx = node.getContext("2d");
      if (!ctx) return;
      let lastWidth = 0;
      function draw() {
        const width = node.clientWidth || 680;
        if (width === lastWidth) return;
        lastWidth = width;
        const height = Math.max(230, Math.min(350, Math.round(width * 0.42)));
        const ratio = Math.min(2, window.devicePixelRatio || 1);
        node.width = Math.round(width * ratio);
        node.height = Math.round(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        const left = 59, right = width - 18, top = 15, bottom = height - 53;
        const axisX = (value) => left + (right - left) * (value - xMin) / (xMax - xMin);
        const axisY = (value) => bottom - (bottom - top) * (value - yMin) / (yMax - yMin);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#0b1629";
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 1;
        ctx.font = "13px system-ui";
        ctx.textBaseline = "middle";
        for (let i = 0; i <= 4; i += 1) {
          const x = xMin + (xMax - xMin) * i / 4;
          const y = yMin + (yMax - yMin) * i / 4;
          ctx.strokeStyle = "#375271";
          ctx.beginPath();
          ctx.moveTo(axisX(x), top);
          ctx.lineTo(axisX(x), bottom);
          ctx.moveTo(left, axisY(y));
          ctx.lineTo(right, axisY(y));
          ctx.stroke();
          ctx.fillStyle = "#adc1da";
          ctx.textAlign = "center";
          ctx.fillText(String(Number(x.toFixed(2))), axisX(x), bottom + 13);
          ctx.textAlign = "right";
          ctx.fillText(String(Number(y.toFixed(2))), left - 6, axisY(y));
        }
        ctx.save();
        ctx.beginPath();
        ctx.rect(left - 4, top - 4, right - left + 8, bottom - top + 8);
        ctx.clip();
        for (const rule of rules) {
          ctx.strokeStyle = rule.color;
          ctx.lineWidth = 1.5;
          ctx.setLineDash(rule.dashed ? [6, 5] : []);
          ctx.beginPath();
          ctx.moveTo(left, axisY(rule.value));
          ctx.lineTo(right, axisY(rule.value));
          ctx.stroke();
        }
        for (const curve of curves) {
          ctx.strokeStyle = curve.color;
          ctx.fillStyle = curve.color;
          ctx.lineWidth = 2.5;
          ctx.setLineDash([]);
          if (curve.connect) {
            ctx.beginPath();
            curve.points.forEach(([x, y], i) => {
              if (i === 0) ctx.moveTo(axisX(x), axisY(y));
              else ctx.lineTo(axisX(x), axisY(y));
            });
            ctx.stroke();
          }
          if (curve.dots) curve.points.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(axisX(x), axisY(y), 4.3, 0, Math.PI * 2);
            ctx.fill();
          });
        }
        ctx.restore();
        ctx.font = "600 14px system-ui";
        ctx.fillStyle = "#deedf9";
        ctx.textAlign = "center";
        ctx.fillText(axes[0], (left + right) / 2, height - 11);
        ctx.save();
        ctx.translate(14, (top + bottom) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(axes[1], 0, 0);
        ctx.restore();
      }
      draw();
      if (typeof ResizeObserver === "undefined") return;
      const resize = new ResizeObserver(draw);
      resize.observe(node);
      return () => resize.disconnect();
    }, [xMin, xMax, yMin, yMax, curves, rules, axes]);
    return jsx("canvas", { className: "academy-canvas", ref: canvas, width: 680, height: 270, role: "img", "aria-label": axes.join(" / ") });
  }

  const qty = (language) => new Intl.NumberFormat(language, { maximumFractionDigits: 2 });
  function slider(label, value, change, limits, show) {
    const [min, max, step] = limits;
    return jsxs("label", { className: "academy-slider", children: [
      jsxs("span", { children: [label, jsx("strong", { children: show })] }),
      jsx("input", { value, type: "range", min, max, step, "aria-valuetext": show, onChange: (event) => change(Number(event.target.value)) }),
    ] });
  }

  function Doe({ language, ui }) {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const format = qty(language);
    const cells = Array.from({ length: 121 }, (_, i) => {
      const x = (i % 11 - 5) / 5;
      const y = (5 - Math.floor(i / 11)) / 5;
      const active = Math.round(a * 5) === Math.round(x * 5) && Math.round(b * 5) === Math.round(y * 5);
      const tone = 18 + Math.max(0, Math.min(48, (responseAt(x, y) - 62) * 1.8));
      return jsx("i", { "data-active": active, style: { backgroundColor: "hsl(" + (255 - tone) + " 70% " + tone + "%)" } }, i);
    });
    return jsxs("div", { className: "academy-visual", children: [
      jsx("div", { className: "academy-heatmap", "aria-hidden": "true", children: cells }),
      jsxs("div", { className: "academy-chart-controls", children: [
        slider(ui.doeAxes[0], a, setA, [-1, 1, 0.1], format.format(a)),
        slider(ui.doeAxes[1], b, setB, [-1, 1, 0.1], format.format(b)),
        jsxs("output", { className: "academy-output", children: [ui.response + " · ", jsx("strong", { children: format.format(responseAt(a, b)) })] }),
        jsx("p", { children: ui.doeNote }),
        jsx("p", { className: "quest-help", children: ui.doeSource }),
      ] }),
    ] });
  }

  function Spc({ language, ui }) {
    const [last, setLast] = useState(107);
    const readings = [99, 101, 100, 102, 99, 100, 101, 98, 100, 102, 99, last];
    const rules = [94, 100, 106].map((value) => ({ value, color: value === 100 ? "#a6bbe1" : "#ea9fd5", dashed: value !== 100 }));
    const curves = [{ points: readings.map((value, i) => [i + 1, value]), color: "#88ecff", dots: true, connect: true }];
    return jsxs("div", { className: "academy-chart-stack", children: [
      slider(ui.spcLabel, last, setLast, [88, 112, 1], qty(language).format(last)),
      jsx("output", { className: "academy-output", "data-alert": last < 94 || last > 106, children: ui.spcStatus[last < 94 || last > 106 ? 1 : 0] + " · " + ui.spcSpec[last < 90 || last > 110 ? 1 : 0] }),
      jsx(Plot, { xMin: 1, xMax: 13, yMin: 88, yMax: 112, curves, rules, axes: [ui.spcX, ui.spcY] }),
      jsx("p", { children: ui.spcNote }),
    ] });
  }

  function Abe({ language, ui }) {
    const [ratio, setRatio] = useState(104);
    const [halfWidth, setHalfWidth] = useState(0.12);
    const format = qty(language);
    const ratioFormat = new Intl.NumberFormat(language, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const result = abeInterval(ratio, halfWidth);
    const position = (point) => 100 * (point - 50) / 128;
    const span = (lo, hi) => ({ left: position(lo) + "%", width: position(hi) - position(lo) + "%" });
    return jsxs("div", { className: "academy-chart-stack", children: [
      jsxs("div", { className: "academy-twin-controls", children: [
        slider(ui.ratio, ratio, setRatio, [84, 122, 1], ratioFormat.format(ratio / 100)),
        slider(ui.width, halfWidth, setHalfWidth, [0.035, 0.32, 0.005], format.format(halfWidth)),
      ] }),
      jsxs("div", { className: "academy-ci-axis", "aria-hidden": "true", children: [
        jsx("span", { className: "academy-ci-region", style: span(80, 125) }),
        jsx("i", { className: "academy-ci-line", style: span(result.lower, result.upper) }),
        jsx("i", { className: "academy-ci-dot", style: { left: position(ratio) + "%" } }),
        ...[80, 100, 125].map((value) => jsx("b", { style: { left: position(value) + "%" }, children: ratioFormat.format(value / 100) }, value)),
      ] }),
      jsx("div", { className: "academy-presets", children: [[104, 0.12], [101, 0.255], [119, 0.08]].map(([r, w], i) => jsx("button", {
        type: "button", className: "quest-button quest-button-quiet", onClick: () => { setRatio(r); setHalfWidth(w); },
        children: ui.abeExamples[i],
      }, i)) }),
      jsx("output", { className: "academy-output", "data-alert": !result.inside, children: ui.ci + " · " + ratioFormat.format(result.lower / 100)
        + " – " + ratioFormat.format(result.upper / 100) + " · " + ui.abeStatus[result.inside ? 0 : 1] }),
      jsx("p", { children: ui.abeNote }),
    ] });
  }

  function Pbe({ language, ui }) {
    const [shift, change] = useState(0);
    const [sd, setSd] = useState(6);
    const fmt = qty(language);
    const allocation = (mean, spread, color) => ({
      points: Array.from({ length: 129 }, (_, i) => {
        const x = 68 + i / 2;
        return [x, normalDensity(x, mean, spread)];
      }), color, connect: true,
    });
    return jsxs("div", { className: "academy-chart-stack", children: [
      jsxs("div", { className: "academy-twin-controls", children: [
        slider(ui.pbeInput[0], shift, change, [-8, 8, 0.5], fmt.format(shift)),
        slider(ui.pbeInput[1], sd, setSd, [1.5, 10, 0.5], fmt.format(sd)),
      ] }),
      jsx(Plot, { xMin: 68, xMax: 132, yMin: 0, yMax: 0.28, curves: [allocation(100, 3, "#8af0ff"), allocation(100 + shift, sd, "#f2a6fa")], rules: [], axes: [ui.pbeX, ui.pbeY] }),
      jsx("p", { className: "academy-legend", children: [
        jsx("span", { children: ui.pbeRef + " · μ 100 / σ 3" }),
        jsx("span", { children: ui.pbeTest + " · μ " + fmt.format(100 + shift) + " / σ " + fmt.format(sd) }),
      ] }),
      jsx("p", { children: ui.pbeNote }),
    ] });
  }

  function Calibration({ language, ui }) {
    const [scale, change] = useState(2);
    const [fanning, setFanning] = useState(true);
    const computed = calibrationResiduals(scale, fanning);
    const range = Math.max(3, Math.ceil(Math.max(...computed.model.map(([, error]) => Math.abs(error))) + 1));
    return jsxs("div", { className: "academy-chart-stack", children: [
      slider(ui.noise, scale, change, [0.5, 5, 0.25], qty(language).format(scale)),
      jsxs("label", { className: "academy-check", children: [
        jsx("input", { type: "checkbox", checked: fanning, onChange: (event) => setFanning(event.target.checked) }), ui.changing,
      ] }),
      jsx("output", { className: "academy-output", children: "R² " + new Intl.NumberFormat(language, { maximumFractionDigits: 5 }).format(computed.r2) }),
      jsx(Plot, { xMin: 0, xMax: 12, yMin: -range, yMax: range,
        curves: [{ points: computed.model, color: "#91edff", dots: true }], rules: [{ value: 0, color: "#c594e8", dashed: true }],
        axes: [ui.calX, ui.calY] }),
      jsx("p", { children: ui.calNote }),
    ] });
  }

  const panels = { doe: Doe, spc: Spc, abe: Abe, pbe: Pbe, calibration: Calibration };

  return function Charts({ language, active, select, sourceLink }) {
    const i = language === "tr" ? 0 : 1;
    const ui = chartDetails[language];
    const Panel = panels[active];
    return jsxs("div", { className: "academy-charts", children: [
      jsx("div", { className: "quest-segments academy-chart-modes", "aria-label": ui.label,
        children: Object.entries(academyCharts).map(([key, name]) => jsx("button", {
          type: "button", "aria-pressed": key === active, onClick: () => select(key), children: name[i],
        }, key)) }),
      jsxs("section", { className: "academy-reading quest-panel", children: [
        jsx("h2", { children: academyCharts[active][i] }),
        jsx(Panel, { language, ui }),
        jsxs("p", { className: "academy-ref", children: [
          ui.source + " · ", sourceLink({ doe: "nistDoe", spc: "nistSpc", abe: "abe", pbe: "pbe", calibration: "miller" }[active]),
        ] }),
      ] }),
    ] });
  };
}
