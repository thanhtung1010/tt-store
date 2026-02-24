# TT-Angular-Portfolio

A high-performance, single-page Portfolio Landing Page for a Web Developer, built with the latest **Angular 20+** and **Tailwind CSS 4**. This project focuses on speed, SEO, and a premium user experience using Server-Side Rendering (SSR) and modern web technologies.

## 🚀 Key Features

-   **Bleeding Edge Tech**: Built with **Angular 20** and **Tailwind CSS 4**.
-   **Server-Side Rendering (SSR)**: Enhanced SEO and initial load performance using Angular Universal.
-   **High Performance**: Optimized with Angular Signals, hydration, and minimal dependencies.
-   **Dynamic Theming**: Built-in support for Dark and Light modes.
-   **Internationalization (i18n)**: Complete multi-language support (English/Vietnamese) via `@ngx-translate`.
-   **Interactive Visualizations**:
    -   **D3.js** powered Interests Map.
    -   **Lottie** animations for reliable and scalable vector graphics.
-   **Standalone Architecture**: Fully utilizes Angular's standalone components API.

## 🛠 Technology Stack

-   **Framework**: [Angular v20+](https://angular.dev)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (PostCSS)
-   **Language**: TypeScript v5.9
-   **State Management**: Angular Signals
-   **Visuals**: [D3.js](https://d3js.org), [LottieFiles](https://lottiefiles.com)
-   **I18n**: [@ngx-translate/core](https://github.com/ngx-translate/core)
-   **Build Tool**: Angular CLI (esbuild)

## 📂 Project Structure

```bash
public/  
src/
├── app/
│   ├── components/       # Standalone UI components (Header, Footer, Main, etc.)
│   ├── data/             # Static data definitions (Bucket List, Interests, etc.)
│   ├── services/         # Core application logic (Language, Layout, Cookies)
│   ├── interfaces/       # TypeScript interfaces
│   ├── app.ts            # Root application component
│   └── ...             # Static assets (Images, Fonts, Icons)
└── styles/               # Global styles and Tailwind configuration
```

## ⚡ Getting Started

### Prerequisites

-   **Node.js**: v18.13.0 or higher
-   **npm**: v8.x or higher

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/thanhtung1010/tt-angular-portfolio.git
    cd tt-angular-portfolio
    ```

2.  Install dependencies (exact versions recommended):
    ```bash
    npm install
    ```

### Development Server

Run the development server with hot-reload:
```bash
npm start
```
Navigate to `http://localhost:8080/`.

### Build

Build the project for production:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

### Server-Side Rendering (SSR)

To preview the SSR build locally:
```bash
npm run serve:ssr:tt-angular-portfolio
```

## 🧪 Testing

Run unit tests via [Karma](https://karma-runner.github.io):
```bash
npm test
```

## 📝 Rules & Guidelines

This project follows strict coding conventions defined in `GEMINI.md`.
-   **Signals**: All state management uses Angular Signals.
-   **Standalone**: No NgModules; all components are standalone.
-   **Utility-First**: Styles are primarily handled via Tailwind utility classes.
-   **Static Data**: Data is managed locally to ensure maximum loading speed.

## 📄 License

This project is proprietary.
