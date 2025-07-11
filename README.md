# QuoteQuest

A modern, elegant, and highly interactive quote app built with React + TypeScript, featuring:

- ✨ Glassmorphism UI with animated gradient accent ring
- 🌗 Beautiful dark/light mode with animated toggle
- 🎨 Pastel accent gradients and premium typography (Inter)
- 🧊 Frosted glass card with depth, shadow, and tactile feel
- 🚀 Smooth animated transitions for quotes and controls
- 📱 Fully responsive and mobile-friendly
- 🦾 Accessible (keyboard, ARIA, screen reader)
- 📦 PWA-ready for installability and offline support
- 🎉 Instant feedback toasts for copy, favorite, and errors
- 🔗 Social sharing (Twitter, WhatsApp, LinkedIn)
- ⭐ Animated rating, favorites, and persistent preferences

## Demo

![QuoteQuest Demo](demo-screenshot.png)

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-username/quotequest.git
   cd quotequest
   ```
2. **Install dependencies:**
   ```sh
   npm install
   cd server && npm install && cd ..
   ```
3. **Start the backend proxy:**
   ```sh
   cd server
   npm start
   ```
4. **Start the frontend:**
   ```sh
   cd ..
   npm run dev
   ```
5. **Open in your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port Vite shows)

## Features

- **Modern UI:** Glassmorphism, gradients, and beautiful typography
- **Animated Transitions:** Smooth quote card and theme toggle animations
- **Dark/Light Mode:** True contrast, animated toggle, and persistent preference
- **Responsive:** Looks perfect on mobile, tablet, and desktop
- **Accessibility:** Keyboard navigation, ARIA, and screen reader support
- **PWA:** Installable and works offline (recent quotes cached)
- **Social Sharing:** Share quotes to Twitter, WhatsApp, LinkedIn
- **Favorites & Rating:** Save, rate, and persist your favorite quotes
- **Feedback Toasts:** Instant, beautiful feedback for user actions

## Tech Stack
- React 19 + TypeScript
- Vite
- Express (backend proxy)
- react-icons, react-transition-group
- Inter font (Google Fonts)

## Customization
- Easily change color palette, gradients, or add more themes in `src/styles/themes.css`.
- Add more quote sources or offline quote packs in `src/utils/api.ts`.

## License
MIT
