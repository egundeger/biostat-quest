const storage = {
  progress: "biostat-quest-progress",
  stats: "biostat-quest-stats",
  achievements: "biostat-quest-achievements",
  language: "biostat-quest-language",
  completed: "biostat-quest-last-result",
};

function read(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return null;
  }
}

export function preferredLanguage() {
  const saved = read(storage.language);
  return saved === "en" || saved === "tr" ? saved : null;
}

export function saveLanguage(language) {
  try {
    window.localStorage.setItem(storage.language, JSON.stringify(language));
  } catch {
    // The game can run in browsers that deny local storage.
  }
}

export function loadQuestState(initial) {
  const stats = read(storage.stats);
  const achievements = read(storage.achievements);
  const progress = read(storage.progress);
  const completed = read(storage.completed);
  const hasProgress = progress?.gameStatus === "playing"
    && Array.isArray(progress.scenarios)
    && Array.isArray(progress.history)
    && Number.isInteger(progress.currentIndex)
    && Boolean(progress.scenarios[progress.currentIndex]?.id);
  const onResults = /\/dashboard\/?$/.test(window.location.pathname)
    || /^#\/dashboard(?:\?|$)/.test(window.location.hash);
  const hasResult = onResults && dashboardTab() === "results" && completed?.gameStatus === "finished"
    && Array.isArray(completed.scenarios) && completed.scenarios.length > 0
    && Array.isArray(completed.history) && completed.history.length === completed.scenarios.length;
  const session = hasProgress ? progress : hasResult ? completed : null;

  return {
    ...initial,
    ...session,
    language: session?.language ?? preferredLanguage() ?? initial.language,
    playerStats: { ...initial.playerStats, ...progress?.playerStats, ...stats },
    unlockedAchievements: Array.isArray(achievements) ? achievements : progress?.unlockedAchievements ?? [],
  };
}

export function saveQuestState(state) {
  try {
    if (state.gameStatus === "playing") {
      window.localStorage.setItem(storage.progress, JSON.stringify(state));
    } else {
      window.localStorage.removeItem(storage.progress);
      if (state.gameStatus === "finished") {
        window.localStorage.setItem(storage.completed, JSON.stringify(state));
      }
    }
    window.localStorage.setItem(storage.stats, JSON.stringify(state.playerStats));
    window.localStorage.setItem(storage.achievements, JSON.stringify(state.unlockedAchievements));
  } catch {
    // Saving is optional when local storage is unavailable.
  }
}

export function questQuery() {
  const query = window.location.hash.includes("?")
    ? window.location.hash.split("?")[1]
    : window.location.search;
  return new URLSearchParams(query);
}

export function dashboardTab() {
  const tab = questQuery().get("tab");
  return tab === "study" || tab === "achievements" ? tab : "results";
}

export function prefersReducedMotion() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}
