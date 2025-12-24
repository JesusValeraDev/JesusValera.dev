# JesusValera.dev

Personal site built with Zola and Tailwind CSS.

- Zola (static site generator)
- TailwindCSS v4
- Node scripts for CSS build/concat

## Prerequisites

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
- Source files live under `css/` and are concatenated by `scripts/concat-tailwind.js` into `css/tailwind.entry.css` (keeps a predictable layer order), then processed by TailwindCSS v4.
- TailwindCSS v4 auto-scans content using `@source` directive in `css/theme.css`:
  - `../content/**/*.md`
  - Templates and JS files

CSS structure:

```
css/
├── theme.css         # TailwindCSS v4 config (@theme blocks, @source)
├── base.css          # Base resets, global HTML/body styles
└── components/       # Component-specific styles
    ├── base.css      # Common components (badges, buttons)
    ├── books.css     # Reading list components
    ├── catalogue.css # Project catalogue  
    ├── cv.css        # CV/resume components
    └── post.css      # Blog post components
```

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
    "build-css": "npm run prebuild-css && postcss ./css/tailwind.entry.css -o ./static/tailwind.css --watch",
    "build-css-dev": "concurrently \"node ./scripts/concat-tailwind.js --watch\" \"postcss ./css/tailwind.entry.css -o ./static/tailwind.css --watch\" --names \"CONCAT,TAILWIND\" --prefix-colors \"yellow,cyan\"",
    "build-css-prod": "npm run prebuild-css && postcss ./css/tailwind.entry.css -o ./static/tailwind.css",
    "dev": "concurrently \"npm run build-css-dev\" \"zola serve\" --names \"CSS,ZOLA\" --prefix-colors \"blue,green\"",
    "lint:css": "stylelint \"css/**/*.{css,scss}\"",
    "prepare": "husky"
  }
}
```
