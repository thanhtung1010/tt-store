# Gemini Rules & Guidelines

This file serves as the "System Instructions" and "Rule File" for Gemini (Antigravity) when working on this project.

## 1. Project Context
- **Project Name**: tt-angular-portfolio
- **Project Type**: A high-performance, single-page Portfolio Landing Page for a Web Developer.
- **Data Handling**: Static/Frontend-only (No Backend). Data is managed via local JSON or hardcoded Signals to maintain speed.
- **Rendering Strategy**: **Angular SSR (Server-Side Rendering)** is enabled. 
  - **SEO Priority**: Meta tags, Title service, and Semantic HTML are critical.
  - **Hydration**: Use `provideClientHydration()` and ensure no direct DOM manipulation (avoid `window`, `document` outside of `isPlatformBrowser` checks).
- **Framework**: Angular 20+ (Bleeding Edge/Latest)
- **Styling**: Tailwind CSS 4.x
- **Build System**: Angular CLI (`@angular/build`) with Application Builder (esbuild)

## 2. Technology Stack & Best Practices

### Angular (v20+)
- **Standalone Components**: All components, directives, and pipes must be `standalone: true`.
- **Signals**: Use Angular Signals (`signal()`, `computed()`, `effect()`) for state management and reactivity. Avoid `Zone.js` based change detection where possible (Experiment with `ChangeDetectionStrategy.OnPush`).
- **Control Flow**: Use the new built-in control flow syntax (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`.
- **Dependency Injection**: Use the `inject()` function for dependency injection instead of constructor-based injection.
- **Inputs/Outputs**: Use `input()` and `output()` signal-based APIs.
- **Queries**: Use `viewChild()`, `contentChild()` signal-based queries.

### Tailwind CSS (v4.x)
- **Configuration**: Tailwind v4 uses CSS-first configuration. Check `src/styles.css` (or `index.css`) for theme variables (`@theme`).
- **Utility-First**: Use utility classes directly in templates. Avoid creating custom CSS classes unless creating a reusable atomic abstraction (using `@apply`).
- **Dark Mode**: Implement dark mode using the `dark:` variant.
- **Responsive Design**: Mobile-first approach. Use `sm:`, `md:`, `lg:` prefixes.

### TypeScript
- **Strict Mode**: `strict: true` is enabled. No implicit `any`.
- **Interfaces**: Use `interface` for object definitions.
- **Immutability**: Prefer `readonly` properties and `ReadonlyArray<T>`.

## 3. Coding Conventions
- **Naming**:
  - Files: `kebab-case` (e.g., `user-profile.component.ts`)
  - Classes: `PascalCase` (e.g., `UserProfileComponent`)
  - Interfaces: `I + PascalCase` (e.g., `IUserProfile`)
  - Variables/Functions: `camelCase` (e.g., `getUserData`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)
  - Enums: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)
  - Types: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)
- **Structure**:
  - Place components within feature directories (`src/app/features/`).
  - Shared UI components go in `src/app/components/`.
  - Logic/Services go in `src/app/services/`.
- **Selector Prefixing**: 
  - Before creating components or directives, check `angular.json` for the `"prefix"` property.
  - Always use this prefix for selectors (e.g., if prefix is `tt`, use `selector: 'tt-header'`).
  - Do not hardcode `app-` if the configuration specifies otherwise.
- **File Creation (Standalone Architecture)**:
  - **Directory Mapping**: Organize files strictly by type. 
    - Components: `src/app/components/{name}/` (contains .ts, .html, .spec.ts)
    - Services: `src/app/services/`
    - Interfaces: `src/app/interfaces/`
    - Pipes/Directives/Enums: `src/app/{type}s/`
  - **Naming Convention**: Use clean filenames without type suffixes (e.g., `user.ts` inside the `services` folder, not `user.service.ts`), as the directory provides the context.
  - **Automatic Barrel Exports**: 
    - Every type folder must have an `index.ts`. 
    - Upon creating a new file, automatically add `export * from './{filename}';` to the folder's `index.ts`.
  - **Path Aliasing**: 
    - If a new type folder is created, update `tsconfig.json` → `compilerOptions.paths`.
    - Example: `"@components/*": ["src/app/components/*"]`.
  - **Standalone Workflow**: Since these are standalone, do not look for or update `.module.ts` files. Focus on the `index.ts` for clean imports.
- **SSR Safety**: When using Directives that touch the DOM (like `LiquidDirective`), always wrap logic in `afterNextRender` or check `isPlatformBrowser`.
- **Style Management & SCSS Workflow**:
  - **Global vs. Local**: Prefer using Tailwind utility classes in templates. If custom SCSS is required for complex animations or reusable patterns, **do not** use the `@Component({ styles: [...] })` property.
  - **Find & Match Logic**: Before creating a new style rule, locate the appropriate file in `src/styles/scss/`:
    - *Animations*: Update `animations.scss` for keyframes or complex transitions.
    - *Component-specific*: Update `components.scss` for reusable UI patterns.
    - *Selectors/Resets*: Update `selectors.scss` for tag-level styling.
    - *Variables*: Update `variable.scss` for colors/spacing.
  - **Import Hierarchy**: Ensure all new files or major changes are reflected in `index.scss` to maintain the build chain.
  - **BEM Naming**: If writing custom SCSS, follow the BEM (Block Element Modifier) convention to avoid scoping issues in a standalone environment.
  - **Asset Management**:
    - If a task involves static assets (images, icons, fonts, etc.), do not look for an `assets` folder inside `src/`.
    - All assets must be placed in the `public/` folder at the project root.
    - Reference these in code using absolute paths (e.g., `/images/logo.png`) as the build system maps the `public` content to the root of the deployed site.

## 4. Testing
- Use `ng test` (Karma/Jasmine) for unit tests.
- Ensure all new components have basic test coverage ('should create').

## 5. Artifacts & Documentation
- When planning complex changes, create an `implementation_plan.md`.
- Update `task.md` to track progress.
- Document any specific "gotchas" or workarounds in this file.

## 6. Code Quality & Tooling
- **Formatting**: Strictly follow the rules defined in the `.editorconfig` file (e.g., indentation size, charset, trailing whitespaces, and final newline). 
- **Consistency**: Before providing code, mentally parse the `.editorconfig` to ensure the output matches the project's whitespace and coding style.
- **Linting**: Ensure code is compatible with the project's ESLint/Prettier configuration. Use single quotes for strings and omit semicolons if defined by the project style, but prioritize the `.editorconfig` defaults.

## 7. Dependency & Tooling
- **Package Management**:
  - When suggesting or executing commands to install dependencies (`npm install`), **always** append the `-E` (or `--save-exact`) flag.
  - Example: `npm install @angular/material -E`.
  - This ensures versions are locked in `package.json` to prevent unexpected updates and maintain environment consistency across SSR and client builds.
