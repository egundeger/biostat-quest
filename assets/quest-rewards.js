const rewardCopy = {
  tr: {
    title: "Tur ödülleri", badges: "Bu turda kazanılan rozetler", allBadges: "Rozet koleksiyonunu aç",
    label: "Sertifikada görünecek ad ve soyad", download: "Sertifikayı indir (PDF)",
    csv: "Ayrıntılı sonuçları indir (CSV)", privacy: "Adınız yalnızca bu PDF’yi oluşturmak için kullanılır.",
    issuing: "Sertifika hazırlanıyor…", failure: "PDF oluşturulamadı. Tekrar deneyin.",
    ready: "Sertifika hazır.", certificate: "Tur Tamamlama Sertifikası",
    confirms: "BioStat Quest biyoistatistik uygulama turunu tamamladı.",
    educational: "Eğitim amaçlı oyun içi tamamlama belgesi",
    levels: { easy: "Kolay", medium: "Orta", hard: "Zor" }, result: "Doğru yanıt sayısı",
    questions: "Soru", score: "Doğruluk", date: "Tamamlama tarihi", level: "Düzey",
    headers: ["Soru", "Vaka", "Konu", "Verilen yanıt", "Doğru yanıt", "Sonuç", "XP", "Kaynak", "Düzey", "Tamamlama zamanı", "Tur toplam XP"],
    correct: "Doğru", wrong: "Yanlış",
  },
  en: {
    title: "Round rewards", badges: "Badges earned this round", allBadges: "Open badge collection",
    label: "Full name on the certificate", download: "Download certificate (PDF)",
    csv: "Download detailed results (CSV)", privacy: "Your name is used only to generate this PDF.",
    issuing: "Preparing certificate…", failure: "Couldn’t create the PDF. Please try again.",
    ready: "Certificate ready.", certificate: "Round Completion Certificate",
    confirms: "Completed a BioStat Quest biostatistics practice round.",
    educational: "In-game record of completion for educational use",
    levels: { easy: "Easy", medium: "Medium", hard: "Hard" }, result: "Correct answers",
    questions: "Questions", score: "Accuracy", date: "Completion date", level: "Level",
    headers: ["Question", "Case", "Topic", "Your answer", "Correct answer", "Result", "XP", "Source", "Level", "Completed at", "Round total XP"],
    correct: "Correct", wrong: "Incorrect",
  },
};

function referencedAnswer(state, answer) {
  return answer.correct && Boolean(state.scenarios.find((item) => item.id === answer.id)?.source);
}

export const questBadges = [
  {
    id: "evidence_analyst", name: "Evidence Analyst", nameTR: "Kanıt Analisti",
    description: "Answer three referenced cases correctly in one round.",
    descriptionTR: "Bir turda kaynaklı üç vakayı doğru yanıtla.",
    icon: "🔬", rarity: "rare", xpBonus: 45,
    condition: (state) => state.history.filter((answer) => referencedAnswer(state, answer)).length >= 3,
  },
  {
    id: "research_challenge", name: "Research Challenge", nameTR: "Araştırma Görevi",
    description: "Correctly answer an advanced referenced case.",
    descriptionTR: "Kaynaklı bir ileri düzey vakayı doğru yanıtla.",
    icon: "🧬", rarity: "rare", xpBonus: 30,
    condition: (state) => state.history.some((answer) => referencedAnswer(state, answer)
      && state.scenarios.find((item) => item.id === answer.id)?.difficulty === "hard"),
  },
];

function csvCell(value) {
  let safe = String(value ?? "");
  if (/^[\s]*[=+\-@]/.test(safe) || /^[\t\r\n]/.test(safe)) safe = "'" + safe;
  return '"' + safe.replaceAll('"', '""') + '"';
}

export function resultsCsv(game) {
  const ui = rewardCopy[game.language];
  const byId = new Map(game.scenarios.map((scenario) => [scenario.id, scenario]));
  const timestamp = new Date(game.completedAt ?? Date.now()).toISOString();
  const rows = game.history.map((answer, i) => {
    const item = byId.get(answer.id);
    const correct = item?.options.find((option) => option.correct)?.text ?? "";
    const selected = item?.options.find((option) => option.id === answer.answerId)?.text ?? (answer.correct ? correct : "");
    return [
      i + 1, item?.title, item?.topic ?? answer.topic, selected, correct, answer.correct ? ui.correct : ui.wrong,
      answer.xpEarned, item?.source?.url, ui.levels[game.difficulty], timestamp, game.xp,
    ];
  });
  return "\uFEFF" + [ui.headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

export function imagePdf(image, width, height) {
  const encode = (value) => new TextEncoder().encode(value);
  const chunks = [];
  const offsets = [0];
  let offset = 0;
  function append(value) {
    const bytes = typeof value === "string" ? encode(value) : value;
    chunks.push(bytes);
    offset += bytes.length;
  }
  function object(id, parts) {
    offsets[id] = offset;
    append(id + " 0 obj\n");
    parts.forEach(append);
    append("\nendobj\n");
  }
  append("%PDF-1.4\n");
  object(1, ["<< /Type /Catalog /Pages 2 0 R >>"]);
  object(2, ["<< /Type /Pages /Count 1 /Kids [3 0 R] >>"]);
  object(3, ["<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Certificate 4 0 R >> >> /Contents 5 0 R >>"]);
  object(4, [
    "<< /Type /XObject /Subtype /Image /Width " + width + " /Height " + height
      + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + image.length + " >>\nstream\n",
    image, "\nendstream",
  ]);
  const content = "q\n842 0 0 595 0 0 cm\n/Certificate Do\nQ\n";
  object(5, ["<< /Length " + encode(content).length + " >>\nstream\n", content, "endstream"]);
  const xref = offset;
  append("xref\n0 6\n0000000000 65535 f \n");
  offsets.slice(1).forEach((value) => append(String(value).padStart(10, "0") + " 00000 n \n"));
  append("trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF\n");
  return new Blob(chunks, { type: "application/pdf" });
}

function certificateCanvas(name, game, ui) {
  const canvas = document.createElement("canvas");
  canvas.width = 1684;
  canvas.height = 1190;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw Error("canvas");
  const { width, height } = canvas;
  const mid = width / 2;
  const fill = ctx.createLinearGradient(0, 0, width, height);
  fill.addColorStop(0, "#11182b");
  fill.addColorStop(1, "#392052");
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#78e1f3";
  ctx.lineWidth = 4;
  ctx.strokeRect(46, 46, width - 92, height - 92);
  ctx.strokeStyle = "#a5b9e278";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(64, 64, width - 128, height - 128);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  function line(value, y, size, weight, color, maxWidth = width - 200) {
    ctx.font = weight + " " + size + "px system-ui, sans-serif";
    const fitted = Math.min(size, Math.floor(size * maxWidth / Math.max(1, ctx.measureText(value).width)));
    ctx.font = weight + " " + fitted + "px system-ui, sans-serif";
    ctx.fillStyle = color;
    ctx.fillText(value, mid, y);
  }
  line("BIOSTAT QUEST", 158, 43, 800, "#8de7f6");
  line(ui.certificate, 299, 66, 780, "#f5f3ff");
  line(name, 479, 96, 700, "#a9f4ef");
  line(ui.confirms, 583, 36, 420, "#e5e3f3");
  const percentage = Math.round(100 * game.correctCount / game.scenarios.length);
  const date = new Intl.DateTimeFormat(game.language === "tr" ? "tr-TR" : "en-GB", { dateStyle: "long" })
    .format(game.completedAt ?? Date.now());
  const stats = [
    [ui.level, ui.levels[game.difficulty]],
    [ui.questions, String(game.scenarios.length)],
    [ui.score, new Intl.NumberFormat(game.language, { style: "percent" }).format(percentage / 100)],
    ["XP", String(game.xp)],
  ];
  stats.forEach(([label, value], i) => {
    const x = 245 + i * 397;
    ctx.font = "650 27px system-ui, sans-serif";
    ctx.fillStyle = "#a8bdd3";
    ctx.fillText(label, x, 770);
    ctx.font = "750 50px system-ui, sans-serif";
    ctx.fillStyle = "#f4f8ff";
    ctx.fillText(value, x, 835);
  });
  line(date, 975, 32, 650, "#d7e4f7");
  line(ui.educational, 1043, 25, 450, "#b2bfd7");
  return canvas;
}

export function createRewards({ jsx, jsxs, react }) {
  const { useState } = react;
  return function Rewards({ game, definitions, openBadges }) {
    const ui = rewardCopy[game.language];
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [busy, setBusy] = useState(false);
    const gains = game.newAchievements.map((id) => definitions.find((item) => item.id === id)).filter(Boolean);

    async function issue(event) {
      event.preventDefault();
      const recipient = name.trim().replace(/\s+/g, " ");
      if (!recipient || busy) return;
      setBusy(true);
      setStatus(ui.issuing);
      try {
        const canvas = certificateCanvas(recipient, game, ui);
        const jpg = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
        if (!jpg) throw Error("encoding");
        const pdf = imagePdf(new Uint8Array(await jpg.arrayBuffer()), canvas.width, canvas.height);
        download(pdf, "BioStat-Quest-Certificate.pdf");
        setStatus(ui.ready);
      } catch {
        setStatus(ui.failure);
      } finally {
        setBusy(false);
      }
    }

    return jsxs("section", { className: "quest-rewards", "aria-labelledby": "quest-reward-title", children: [
      jsxs("header", { children: [
        jsx("h2", { id: "quest-reward-title", children: ui.title }),
        jsx("button", { className: "quest-button quest-button-quiet", type: "button", onClick: openBadges, children: ui.allBadges }),
      ] }),
      gains.length > 0 && jsxs("div", { children: [
        jsx("h3", { children: ui.badges }),
        jsx("ul", { className: "quest-badges", children: gains.map((badge) => jsxs("li", { children: [
          jsx("span", { className: "quest-badge-icon", "aria-hidden": "true", children: badge.icon }),
          jsxs("div", { children: [
            jsx("strong", { children: game.language === "tr" ? badge.nameTR : badge.name }),
            jsx("p", { children: game.language === "tr" ? badge.descriptionTR : badge.description }),
          ] }),
          jsx("b", { children: "+" + badge.xpBonus + " XP" }),
        ] }, badge.id)) }),
      ] }),
      jsxs("div", { className: "quest-export", children: [
        jsxs("form", { onSubmit: issue, children: [
          jsxs("label", { children: [jsx("span", { children: ui.label }), jsx("input", {
            name: "participant", autoComplete: "name", required: true, maxLength: 70,
            value: name, onChange: (event) => setName(event.target.value),
          })] }),
          jsx("p", { className: "quest-help", children: ui.privacy }),
          jsx("button", { className: "quest-button quest-button-primary", type: "submit", disabled: busy || !name.trim(), children: ui.download }),
          status && jsx("p", { className: "quest-help", role: "status", children: status }),
        ] }),
        jsx("button", { className: "quest-button quest-button-quiet", type: "button", onClick: () => {
          download(new Blob([resultsCsv(game)], { type: "text/csv;charset=utf-8" }), "BioStat-Quest-Results.csv");
        }, children: ui.csv }),
      ] }),
    ] });
  };
}
