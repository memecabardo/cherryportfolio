# Cherry Portfolio Website

A high-end, responsive personal portfolio website with modern aesthetic designs, built using vanilla HTML5, CSS3, and JavaScript. Featuring glassmorphism panels, interactive 3D card tilt effects, custom cursor ambient glows, and dark/light mode toggle.

## ✨ Features

- **Ambient UI Elements**: Floating glowing background orbs and a custom cursor glow tracking movement.
- **Glassmorphic Card UI**: Clean semi-transparent card layouts built with backdrop-blur, CSS borders, and depth effects.
- **3D Card Hover Tilt**: Real-time perspective transforms on the interactive terminal card.
- **Interactive Project Filtering**: Filter projects by categories (All, Development, Design) with clean fade transitions.
- **Dark/Light Theme Toggle**: Full color-palette shifting that matches system or user local preferences.
- **Responsive System**: Adapts beautifully to mobile, tablet, and desktop layouts.
- **Optimized Assets**: Premium vector icons loaded via Lucide CDNs and custom generated mockups.

## 🚀 Running Locally

### Option 1: Direct File Access
Simply double-click the `index.html` file or open it in your browser.

### Option 2: Local Server (Recommended)
Since this project is placed inside the XAMPP web root directory `c:\xampp\htdocs\portfolio cherry\`:
1. Open the **XAMPP Control Panel**.
2. Start the **Apache** server.
3. Open your browser and navigate to: `http://localhost/portfolio cherry/`

## 📁 Directory Structure

```text
portfolio cherry/
├── assets/
│   ├── avatar.png           # Profile visual avatar
│   ├── project1.png         # Apex Financial Dashboard mockup
│   └── project2.png         # Creata Studio AI mockup
├── index.html               # Main website markup
├── index.css                # Custom CSS design system & responsiveness
├── script.js                # Core interactive logic (theme, observer, filters, 3D tilt)
└── .gitignore               # Exclude metadata from repository
```

## 🛠️ Built With

- **HTML5 & CSS3** (Vanilla CSS Variables & Grid Systems)
- **Vanilla JavaScript** (ES6, IntersectionObserver API, RequestAnimationFrame)
- **Lucide Icons** (Vector Graphic Suite)
