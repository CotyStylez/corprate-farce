# GitHub Pages Workflow Build Step Integration

Enhance the user's `static.yml` GitHub Pages deployment workflow by adding Node.js environment setup and an automated `npm run build` step, while uploading the compiled `dist/` directory and maintaining the complete Vite development environment with hot module replacement.

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following design decisions:

- **Confirmed Decision 1 (Workflow Build Step)**: Integrate `npm ci` and `npm run build` directly into `.github/workflows/static.yml`, and set the artifact upload path to `'./dist'` (instead of root `'.'`). This ensures GitHub Pages receives the fully compiled, minified React bundle with relative asset paths.
- **Confirmed Decision 2 (Preserve Vite Dev Environment)**: Maintain the existing Vite development configuration, scripts (`npm run dev`), TypeScript types, and hot module reloading so local development in AI Studio and elsewhere remains fast and intact.
- **Confirmed Decision 3 (Consolidate Workflows)**: Consolidate the deployment pipelines by removing the duplicate `.github/workflows/deploy.yml` to prevent duplicate action runs in GitHub, keeping `static.yml` as the single authoritative workflow.

---

## 1. Overview & Core Concept

- **What It Does**: When code is pushed to `main` (or triggered via `workflow_dispatch`), GitHub Actions will spin up an Ubuntu runner with Node.js 22, install dependencies, compile the TypeScript + React source into `./dist`, and publish the production bundle to GitHub Pages.
- **Why This Solves The Blank Screen**: GitHub Pages will now serve the bundled `dist/index.html` (which points to relative `./assets/index.js` and `./assets/index.css`) rather than the uncompiled root `index.html` (which points to `/src/main.tsx`).
- **Key Value**: Zero external deployment platforms needed (no Vercel or Netlify required). Runs 100% on GitHub Pages with native GitHub Actions.

---

## 2. User Experience & Visual Design

- **Seamless Live Site**: The site at `https://cotystylez.github.io/corprate-farce/` will render instantly with zero blank screens or asset 404 errors.
- **Full Feature Parity**: All satirical modules load and execute smoothly:
  - C-Suite Parody Workbench (Decision Matrix, Review Generator, Jargon Translator, Excuses)
  - 8-sound Web Audio Conference Soundboard with volume control
  - Emergency Quarterly Panic Mode with pulsing red alarm, siren audio, plummeting stock ticker, and crisis mitigations
  - Zero-telemetry parody live stream, particle canvas animations, and interactive cookie banner.

---

## 3. Key Technical Decisions & Trade-Offs

- **Decision 1: Update Existing `static.yml` Rather Than Imposing a New File**:
  - *Chosen Approach*: Directly edit `.github/workflows/static.yml` which the user generated from the GitHub Pages UI.
  - *Why*: Aligns with the user's existing GitHub settings and UI preferences without confusion over multiple workflow files.
- **Decision 2: Clean `npm ci` and Node.js 22**:
  - *Chosen Approach*: Use official `actions/setup-node@v4` with Node 22 and `cache: 'npm'`, followed by `npm ci` and `npm run build`.
  - *Why*: Fast, reproducible builds that take $\approx 25$–$35$ seconds to build and deploy.

---

## 4. Technical Architecture & File Changes

```
┌─────────────────────────────────────────────────────────────┐
│                    git push origin main                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             .github/workflows/static.yml                    │
│  1. actions/checkout@v4                                     │
│  2. actions/setup-node@v4 (Node 22, npm cache)              │
│  3. npm ci                                                  │
│  4. npm run build  ──> Emits ./dist with relative assets    │
│  5. actions/configure-pages@v5                              │
│  6. actions/upload-pages-artifact@v3 (path: './dist')       │
│  7. actions/deploy-pages@v4                                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          Published at cotystylez.github.io/corprate-farce/  │
│          - Loads ./assets/index-*.js successfully           │
│          - Complete interactive React app mounts            │
└─────────────────────────────────────────────────────────────┘
```

### Steps to Implement Upon Approval:
1. **Update `/.github/workflows/static.yml`**:
   - Add Node.js setup step.
   - Add `npm ci` and `npm run build` steps.
   - Point `upload-pages-artifact` to `path: './dist'`.
2. **Remove Redundant `/.github/workflows/deploy.yml`**:
   - Prevent duplicate conflicting GitHub Actions runs.
3. **Verify Build**:
   - Run `compile_applet` to ensure development and production builds remain verified and clean.
