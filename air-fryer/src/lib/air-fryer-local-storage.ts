export function getChecklistKey(lang: string, scope: string, recordKey: string): string {
  return `crispissimo:air-fryer:checklist:${lang}:${scope}:${recordKey}`;
}

export function saveChecklistState(key: string, states: boolean[]): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(states));
    }
  } catch (e) {
    // silently fail if localStorage is disabled/full
  }
}

export function loadChecklistState(key: string): boolean[] | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
  } catch (e) {
    // silently fail
  }
  return null;
}
