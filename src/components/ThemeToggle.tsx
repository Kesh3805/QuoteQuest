import React from 'react';

export interface ThemeToggleProps {
  theme: string;
  onToggle: (theme: string) => void;
  availableThemes: string[];
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';
  return (
    <button
      className={`theme-animated-toggle${isDark ? ' dark' : ''}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => onToggle(isDark ? 'light' : 'dark')}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: 44,
        height: 44,
        transition: 'background 0.3s',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'scale(0.8) rotate(-30deg)' : 'scale(1) rotate(0deg)',
            transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
          }}
        >
          <circle cx="14" cy="14" r="8" fill="#facc15" />
          <g stroke="#facc15" strokeWidth="2">
            <line x1="14" y1="2" x2="14" y2="6" />
            <line x1="14" y1="22" x2="14" y2="26" />
            <line x1="2" y1="14" x2="6" y2="14" />
            <line x1="22" y1="14" x2="26" y2="14" />
            <line x1="5.1" y1="5.1" x2="8.1" y2="8.1" />
            <line x1="19.9" y1="19.9" x2="16.9" y2="16.9" />
            <line x1="5.1" y1="22.9" x2="8.1" y2="19.9" />
            <line x1="19.9" y1="5.1" x2="16.9" y2="8.1" />
          </g>
        </svg>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(30deg)',
            transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
          }}
        >
          <path
            d="M21 14.5C21 18.09 18.09 21 14.5 21C11.36 21 8.75 18.39 8.75 15.25C8.75 12.41 10.97 10.01 13.75 9.56C13.91 9.53 14 9.36 14 9.2V8.5C14 8.22 14.22 8 14.5 8C14.78 8 15 8.22 15 8.5V9.2C15 9.36 15.09 9.53 15.25 9.56C18.03 10.01 20.25 12.41 20.25 15.25C20.25 18.39 17.64 21 14.5 21C10.91 21 8 18.09 8 14.5C8 10.91 10.91 8 14.5 8C18.09 8 21 10.91 21 14.5Z"
            fill="#facc15"
          />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle; 