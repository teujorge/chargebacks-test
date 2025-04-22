# Frontend Developer Challenge

A modern YouTube redesign built with Next.js and Tailwind CSS, showcasing frontend development skills and attention to design implementation.

## 🎨 Design Reference

This project is based on the [YouTube Redesign - Figma](https://www.figma.com/community/file/1450380484645543336) design.

## ✨ Features

- Functional navigation bar with routing.
- Responsive Home page.
- Interactive hover effects and button states.
- Mobile-first design.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Material Symbols](https://fonts.google.com/icons)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Type Safety:** TypeScript
- **Deployment:** Vercel

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/teujorge/youtube-clone.git
cd youtube-clone
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── providers/         # Context providers
├── types/             # TypeScript type definitions
└── data/              # Mock data and constants
```

## 📱 Pages

- Home
- Explore
- Shorts
- TV
- History
- Watch Later
- Liked Videos
- Playlists
- Collections
- Subscriptions

## 🚀 Deployment

The project is deployed on Vercel:
[Live Demo](https://youtube-clone-matheus.vercel.app)

## 🔧 Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Lint code: `npm run lint`

## ✅ Testing

This project includes unit and integration tests to ensure code quality and reliability.

- **Technologies Used:** Jest, React Testing Library
- **Running Tests:**

  ```bash
  npm run test
  # or
  yarn test
  # or
  pnpm test
  ```

## 📝 Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Component-based architecture
- Responsive design principles
