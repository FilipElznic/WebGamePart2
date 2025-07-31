# Peter's Quest - WebGamePart2

A retro-inspired web game built with React and Tailwind CSS. Help Peter solve mysteries, complete mini-games, and unlock secrets in a dark-themed, story-driven adventure.

## Features

- Dark color theme (black, dark zinc, dark purple)
- User authentication (login/register)
- Multiple game stages and mini-games (Jumping Game, Snake Game, Chest, etc.)
- XP system and stage unlocking
- Animated retro UI elements and scan lines
- Responsive design for desktop
- Firebase integration for auth and user data

## Tech Stack

- React
- Tailwind CSS
- Vite
- Firebase (auth, user data)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open in browser:**
   Visit `http://localhost:5173` (or as shown in terminal)

## Project Structure

- `src/Components/` - UI components (Navbar, Footer, GameStart, etc.)
- `src/pages/` - Main pages (MainPage, GamePage, LoginPage, RegisterPage, etc.)
- `src/firebase/` - Firebase config and auth logic
- `public/` - Static assets (images)

## Customization

- **Colors:** All major UI elements use dark theme colors. Adjust Tailwind config or component classes for further customization.
- **Mini-games:** Add or modify mini-games in `src/Components/` and link them in the main menu.

## Credits

- Developed by Filip Elznic
- Art and story by project contributors

## License

This project is for educational and personal use. Contact the author for other uses.
