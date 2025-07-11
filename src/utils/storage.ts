export interface UserPreferences {
  theme: string;
  font: string;
  fontSize: string;
  colorScheme: string;
}

export interface FavoriteQuote {
  id: string;
  quote: string;
  author: string;
  category?: string;
  tags?: string[];
  rating?: number;
}

export interface QuoteHistoryItem extends FavoriteQuote {
  viewedAt: string;
}

const STORAGE_VERSION = '1.0';
const FAVORITES_KEY = 'qq_favorites';
const PREFS_KEY = 'qq_prefs';
const HISTORY_KEY = 'qq_history';

export function saveFavorites(favorites: FavoriteQuote[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify({ v: STORAGE_VERSION, data: favorites }));
}

export function loadFavorites(): FavoriteQuote[] {
  const raw = localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return parsed.data || [];
  } catch {
    return [];
  }
}

export function savePreferences(prefs: UserPreferences) {
  localStorage.setItem(PREFS_KEY, JSON.stringify({ v: STORAGE_VERSION, data: prefs }));
}

export function loadPreferences(): UserPreferences | null {
  const raw = localStorage.getItem(PREFS_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed.data || null;
  } catch {
    return null;
  }
}

export function saveHistory(history: QuoteHistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify({ v: STORAGE_VERSION, data: history }));
}

export function loadHistory(): QuoteHistoryItem[] {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return parsed.data || [];
  } catch {
    return [];
  }
} 