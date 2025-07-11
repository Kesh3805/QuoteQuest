import React, { useEffect, useState, useCallback, useRef } from 'react';
import QuoteDisplay from './components/QuoteDisplay';
import Controls from './components/Controls';
import ThemeToggle from './components/ThemeToggle';
import { fetchRandomQuote } from './utils/api';
import type { Quote } from './utils/api';
import {
  loadFavorites,
  saveFavorites,
  loadPreferences,
  savePreferences,
} from './utils/storage';
import type { FavoriteQuote, UserPreferences } from './utils/storage';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './styles/main.css';
import './styles/quote-animations.css';
import Toast from './components/Toast';

const AVAILABLE_THEMES = ['light', 'dark'];
const DEFAULT_PREFS: UserPreferences = {
  theme: 'light',
  font: 'Inter',
  fontSize: '1rem',
  colorScheme: 'light',
};

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [favorites, setFavorites] = useState<FavoriteQuote[]>([]);
  const [theme, setTheme] = useState<string>(DEFAULT_PREFS.theme);
  const [rating, setRating] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);
  const quoteNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefs = loadPreferences() || DEFAULT_PREFS;
    setTheme(prefs.theme);
    const favs = loadFavorites();
    setFavorites(favs);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    savePreferences({ ...DEFAULT_PREFS, theme });
  }, [theme]);

  const getQuote = useCallback(async () => {
    setLoading(true);
    try {
      const q = await fetchRandomQuote();
      setQuote(q);
      if (q) {
        const fav = favorites.find(f => f.quote === q.q && f.author === q.a);
        setIsFavorite(!!fav);
        setRating(fav?.rating || 0);
      } else {
        setIsFavorite(false);
        setRating(0);
      }
    } catch (e) {
      setToast({ message: 'Failed to fetch quote. Please try again.', type: 'error' });
    }
    setLoading(false);
  }, [favorites]);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  const handleNext = () => getQuote();
  const handlePrev = () => {};
  const handleCopy = () => {
    if (quote) {
      navigator.clipboard.writeText(`"${quote.q}" — ${quote.a}`);
      setToast({ message: 'Copied!', type: 'success' });
    }
  };
  const handleShare = (platform: string) => {
    if (!quote) return;
    const text = encodeURIComponent(`"${quote.q}" — ${quote.a}`);
    let url = '';
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${text}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${text}`;
    } else if (platform === 'whatsapp') {
      url = `https://wa.me/?text=${text}`;
    }
    if (url) window.open(url, '_blank');
  };
  const handleFavorite = () => {
    if (!quote) return;
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(f => !(f.quote === quote.q && f.author === quote.a));
    } else {
      updatedFavorites = [
        ...favorites,
        { id: Date.now().toString(), quote: quote.q, author: quote.a, category: quote.c, rating },
      ];
      setToast({ message: 'Added to favorites!', type: 'info' });
    }
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };
  const handleRate = (star: number) => {
    setRating(star);
    if (quote) {
      let updatedFavorites = [...favorites];
      const idx = updatedFavorites.findIndex(f => f.quote === quote.q && f.author === quote.a);
      if (idx !== -1) {
        updatedFavorites[idx].rating = star;
        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
      }
    }
  };
  const handleThemeToggle = (newTheme: string) => setTheme(newTheme);

  return (
    <div className="app-container">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '2.5rem', position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} availableThemes={AVAILABLE_THEMES} />
      </div>
      <h1>QuoteQuest</h1>
      <div aria-live="polite" style={{ width: '100%' }}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={loading ? 'loading' : quote?.q || 'empty'}
            timeout={400}
            classNames="quote-fade"
            nodeRef={quoteNodeRef}
          >
            <div ref={quoteNodeRef}>
              {loading ? (
                <div className="quote-loading-spinner">
                  <div className="spinner" />
                </div>
              ) : quote ? (
                <QuoteDisplay quote={quote.q} author={quote.a} category={quote.c} />
              ) : (
                <div className="loading">Loading quote...</div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <Controls
        onNext={handleNext}
        onPrev={handlePrev}
        onCopy={handleCopy}
        onShare={handleShare}
        onFavorite={handleFavorite}
        onRate={handleRate}
        currentRating={rating}
        isFavorite={isFavorite}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          actionLabel={toast.type === 'error' ? 'Retry' : undefined}
          onAction={toast.type === 'error' ? () => { setToast(null); getQuote(); } : undefined}
        />
      )}
    </div>
  );
}

export default App;
