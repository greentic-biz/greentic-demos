# greentic-demos

This repository contains the `demos.greentic.ai` frontend. It is a Vite + React single-page app that builds to a static `dist/` artifact and deploys to GitHub Pages with GitHub Actions.

## Local development

Install dependencies and start the dev server:

```bash
npm ci
npm run dev
```

Create a production build locally:

```bash
npm run build
```

The production artifact is written to `dist/`.

## GitHub Pages deployment

Deployments are handled by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). On every push to `main`, the workflow:

1. installs dependencies with `npm ci`
2. builds the Vite app
3. prepares the Pages artifact
4. uploads `dist/`
5. deploys it with the official GitHub Pages actions

Built files do not need to be committed to `main` or `gh-pages`.

## Base-path handling

The app uses an environment-driven Vite base path:

- For the current GitHub Pages project URL, the workflow builds with the repository Pages base path.
- For the future custom domain `https://demos.greentic.ai/`, set the repository variable `PAGES_CUSTOM_DOMAIN=demos.greentic.ai`. The workflow will then build with `/` as the base path.

The React router uses the same base path, so app routes and asset URLs stay correct in both environments.

## SPA routing on GitHub Pages

GitHub Pages does not natively rewrite SPA routes to `index.html`. The build therefore generates a lightweight `404.html` that redirects deep links back into the app. Refreshes and direct visits to routes like `/demo/example` work on Pages without switching to hash routing.

## `.nojekyll` and `CNAME`

The build step generates:

- `dist/.nojekyll` so Pages serves the output as plain static files with no Jekyll processing
- `dist/CNAME` when `PAGES_CUSTOM_DOMAIN` is set

If `PAGES_CUSTOM_DOMAIN` is not set, no `CNAME` file is emitted, so the temporary GitHub Pages URL keeps working.

## Required GitHub settings

In GitHub, open `Settings` -> `Pages` and set:

- `Source`: `GitHub Actions`

Nothing else is required for the temporary Pages URL.

When you are ready to switch to `demos.greentic.ai`:

1. add a repository variable named `PAGES_CUSTOM_DOMAIN` with value `demos.greentic.ai`
2. add the DNS record for `demos.greentic.ai`
3. in `Settings` -> `Pages`, set the custom domain to `demos.greentic.ai`
4. let the workflow redeploy so the generated `CNAME` file matches the custom domain
