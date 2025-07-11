import React from 'react';

export interface QuoteDisplayProps {
  quote: string;
  author: string;
  category?: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, author, category }) => {
  return (
    <section aria-label="Quote Display" className="quote-display">
      <blockquote className="quote-text">{quote}</blockquote>
      <footer className="quote-footer">
        <span className="quote-author">{author}</span>
        {category && <span className="quote-category">{category}</span>}
      </footer>
    </section>
  );
};

export default QuoteDisplay; 