import React from 'react';
import { FiRefreshCw, FiCopy, FiHeart, FiHeart as FiHeartFilled, FiTwitter, FiShare2 } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

export interface ControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onCopy: () => void;
  onShare: (platform: string) => void;
  onFavorite: () => void;
  onRate: (rating: number) => void;
  currentRating: number;
  isFavorite: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onNext,
  onCopy,
  onShare,
  onFavorite,
  onRate,
  currentRating,
  isFavorite,
}) => {
  return (
    <nav className="controls" aria-label="Quote Controls">
      <button className="icon-btn" onClick={onNext} aria-label="Refresh Quote" title="Refresh">
        <FiRefreshCw />
      </button>
      <button className="icon-btn" onClick={onCopy} aria-label="Copy Quote" title="Copy">
        <FiCopy />
      </button>
      <button className="icon-btn" onClick={onFavorite} aria-label={isFavorite ? 'Unfavorite' : 'Favorite'} title="Favorite">
        {isFavorite ? <FiHeartFilled style={{ color: 'crimson' }} /> : <FiHeart />}
      </button>
      <button className="icon-btn" onClick={() => onShare('twitter')} aria-label="Share on Twitter" title="Share on Twitter">
        <FiTwitter />
      </button>
      <button className="icon-btn" onClick={() => onShare('whatsapp')} aria-label="Share on WhatsApp" title="Share on WhatsApp">
        <SiWhatsapp />
      </button>
      <button className="icon-btn" onClick={() => onShare('linkedin')} aria-label="Share on LinkedIn" title="Share on LinkedIn">
        <FiShare2 />
      </button>
      <div className="rating" aria-label="Rate this quote" style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
        {[1,2,3,4,5].map(star => (
          <button
            key={star}
            onClick={() => onRate(star)}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            className={star <= currentRating ? 'rated' : ''}
            style={{ color: star <= currentRating ? '#fbbf24' : '#b3b8c5', fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }}
          >
            ★
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Controls; 