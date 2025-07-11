export interface Quote {
  q: string; // quote text
  a: string; // author
  c?: string; // category/tag
}

export async function fetchRandomQuote(): Promise<Quote | null> {
  try {
    console.log('Fetching quote from /api/quote...');
    const res = await fetch('/api/quote');
    console.log('Response status:', res.status);
    const data = await res.json();
    console.log('Fetched data:', data);
    if (Array.isArray(data) && data[0]) {
      return { q: data[0].q, a: data[0].a, c: data[0].c };
    }
    return null;
  } catch (e) {
    console.error('Error fetching quote:', e);
    return null;
  }
}

// TODO: Add fetchDailyQuote, fetchByCategory, and rate limiting logic 