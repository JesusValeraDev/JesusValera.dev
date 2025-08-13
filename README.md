# JesusValera.dev

Personal site built with Zola and Tailwind CSS.

### Stack
- Zola (static site generator)
- Tailwind CSS 3
- Node scripts for CSS build/concat

### Prerequisites
- Zola installed and on your PATH
- Node.js 18+ and npm

### Install dependencies
```bash
npm ci
# enable git hooks
npm run prepare
```

### Develop locally
Run Tailwind (watch) and Zola server (single command):
```bash
npm run dev
```
Now visit http://127.0.0.1:1111

### Production build
```bash
# Generate optimized CSS
npm run build-css-prod

# Build static site
zola build
```
Output goes to the `public/` directory.

### CSS/Tailwind workflow
- The final CSS is `static/tailwind.css`.
- Source files live under `sass/` and are concatenated by `scripts/concat-tailwind.js` into `sass/tailwind.entry.css` (keeps a predictable layer order), then processed by Tailwind.
- Tailwind scans templates, markdown and JS per `tailwind.config.js`:
  - `./templates/**/*.html`
  - `./content/**/*.md`
  - `./static/js/**/*.js`

Common locations to edit styles:
- `sass/tw-base.css` — base resets, global HTML/body, theme variables
- `sass/tw-components-*.css` — component-level styles using `@layer components`

### Linting & Git hooks
- Stylelint is configured with Tailwind support. Lint all CSS:
```bash
npm run lint:css
```
- A Husky post-commit hook runs the CSS linter automatically after each commit (enabled by `npm run prepare`).

### Theme tokens
Colors, font stacks, spacing scales, etc. are defined in `tailwind.config.js` under `theme.extend`. Prefer using the existing tokens (e.g., `light-*`, `dark-*`) in component styles instead of hard-coded values. This ensures light/dark parity and easier maintenance.

### Useful npm scripts
```json
{
  "scripts": {
    "prebuild-css": "node ./scripts/concat-tailwind.js",
    "build-css": "npm run prebuild-css && tailwindcss -i ./sass/tailwind.entry.css -o ./static/tailwind.css --watch",
    "build-css-prod": "npm run prebuild-css && tailwindcss -i ./sass/tailwind.entry.css -o ./static/tailwind.css --minify",
    "dev": "npm run build-css & zola serve",
    "lint:css": "stylelint \"sass/**/*.{css,scss}\"",
    "prepare": "husky"
  }
}
```
