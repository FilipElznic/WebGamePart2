# 🚀 WebGame - Interactive Space Adventure

<div align="center">

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.0.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**An immersive web-based space adventure game featuring interactive puzzles, character dialogue, and progressive storylines.**

[🎮 Play Now](#getting-started) • [📖 Documentation](#features) • [🛠️ Contributing](#development)

</div>

---

## 🌟 Features

### 🎯 **Interactive Gameplay**

- **6 Progressive Stages** - Journey through challenging levels with unique objectives
- **Character Dialogue System** - Engaging conversations with AI and Peter companions
- **Typing Animation Effects** - Smooth, optimized text reveal animations
- **Mini-Games Collection** - Diverse puzzle types including:
  - 🔐 Access Code Decryption
  - ⚡ Wiring Grid Challenges
  - 🎵 Rhythm Synchronization
  - 🚀 Ignition Sequences

### 🎨 **Visual Experience**

- **Retro-Futuristic UI** - Cyberpunk-inspired design with animated elements
- **Responsive Design** - Optimized for various screen sizes
- **Smooth Animations** - RequestAnimationFrame-powered typing effects
- **Dynamic Backgrounds** - Animated grid patterns and floating symbols

### 🔧 **Technical Features**

- **User Authentication** - Firebase-powered login/registration system
- **Progress Tracking** - XP system with protected routes
- **State Management** - Context-based user data management
- **Performance Optimized** - React.memo and efficient rendering

---

## 🎮 Game Stages

| Stage | Name               | Description                       | Key Features                                     |
| ----- | ------------------ | --------------------------------- | ------------------------------------------------ |
| **1** | Initial Diagnosis  | System awakening and introduction | Character introduction, basic navigation         |
| **2** | Secondary Analysis | Deep system analysis              | Advanced puzzles, pattern recognition            |
| **3** | Core Diagnostics   | Critical system evaluation        | Logic challenges, decision making                |
| **4** | System Recovery    | Repair and restoration tasks      | Interactive repair mini-games                    |
| **5** | Final Protocols    | Advanced system operations        | Complex multi-step procedures                    |
| **6** | Mission Complete   | Epic final challenge              | **4 Mini-Games**: Code, Wiring, Rhythm, Ignition |

---

## 🛠️ Tech Stack

### **Frontend**

- **React 19.1.0** - Modern UI framework with latest features
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS 4.x** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### **Backend & Services**

- **Firebase 12.0.0** - Authentication and backend services
- **EmailJS** - Contact form functionality

### **Development Tools**

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/FilipElznic/WebGamePart2.git
   cd WebGamePart2
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file in root directory and add your Firebase configuration
   # Contact the repository owner for Firebase configuration details
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
WebGamePart2/
├── 📁 public/                 # Static assets
│   ├── 🖼️ AI*.png           # Character images
│   ├── 🖼️ peter*.png        # Character images
│   └── 🖼️ dino.png          # Game assets
├── 📁 src/
│   ├── 📁 Components/         # Reusable React components
│   │   ├── 🎮 Final.jsx      # Epic final mission mini-games
│   │   ├── 👤 Peter.jsx      # Character dialogue component
│   │   ├── 🔒 ProtectedRoute.jsx # Auth protection
│   │   └── 📊 UserDataProvider.jsx # State management
│   ├── 📁 pages/             # Route components
│   │   ├── 🏠 MainPage.jsx   # Home page
│   │   ├── 🎯 Stage*Page.jsx # Game stages
│   │   └── 🔐 LoginPage.jsx  # Authentication
│   ├── 📁 firebase/          # Firebase configuration
│   └── 📁 assets/            # Additional assets
├── 📋 package.json           # Dependencies and scripts
├── ⚙️ vite.config.js         # Vite configuration
├── 🎨 tailwind.config.js     # Tailwind configuration
└── 📖 README.md              # This file
```

---

## 🎯 Development

### **Available Scripts**

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

### **Code Style**

- **ESLint** configuration enforces consistent code style
- **Prettier** integration for automatic formatting
- **React Hooks** rules for optimal component patterns

### **Performance Optimizations**

- **React.memo** for component memoization
- **RequestAnimationFrame** for smooth animations
- **Lazy loading** for route-based code splitting
- **Optimized bundle** with Vite's tree shaking

---

## 🎨 Design System

### **Color Palette**

```css
Primary: #8B5CF6 (Purple)
Secondary: #3B82F6 (Blue)
Accent: #F59E0B (Yellow)
Background: Linear gradient from black to purple
Text: White/Gray variations
```

### **Typography**

- **Primary Font**: Monospace (retro-tech aesthetic)
- **Headings**: Bold, uppercase styling
- **Body**: Clean, readable spacing

### **Components**

- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Border styling with corner decorations
- **Animations**: Subtle pulse and bounce effects

---

## 🔧 Configuration

### **Firebase Setup**

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Copy configuration to your `.env` file
4. Update security rules as needed

### **Deployment**

The project is configured for deployment on:

- **Vercel** (recommended) - Zero configuration deployment
- **Netlify** - Static site hosting
- **Firebase Hosting** - Integrated with backend services

---

## 🎮 Gameplay Features

### **Mini-Games**

#### 🔐 **Access Code Puzzle**

- Symbol-based pattern matching
- Progressive difficulty
- Hint system for guidance

#### ⚡ **Grid Rewiring**

- Drag-and-drop interface
- Color-coded connections
- Randomized challenge layout

#### 🎵 **Rhythm Synchronization**

- Directional input sequences
- Beat-based timing
- Score tracking system

#### 🚀 **Ignition Sequence**

- Memory-based color patterns
- Time pressure elements
- Visual feedback system

---

### **Bug Reports**

Please create an issue with detailed information about the bug, including steps to reproduce.

---

## 📄 License

This project is for educational and personal use. Contact the author for commercial use.

---

## 👥 Team

<div align="center">

**Developed with ❤️ by Filip Elznic**

[🐛 Report Bug](https://github.com/FilipElznic/WebGamePart2/issues) • [✨ Request Feature](https://github.com/FilipElznic/WebGamePart2/issues)

</div>

---

## 🎉 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind Labs** for the utility-first CSS framework
- **Firebase Team** for the backend infrastructure
- **Community Contributors** for bug reports and suggestions

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

</div>

## 🌐 Deployment

This project is ready for deployment on [Vercel](https://web-game-part2-jervtr3ti-filips-projects-202dcf37.vercel.app/). The included `vercel.json` ensures correct single-page application routing for all client-side routes.

<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>

Made with ❤️ by Filip Elznic.
