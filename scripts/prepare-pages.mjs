import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexHtmlPath = path.join(distDir, "index.html");

if (!existsSync(indexHtmlPath)) {
  throw new Error(`Expected build output at ${indexHtmlPath}`);
}

mkdirSync(distDir, { recursive: true });
writeFileSync(path.join(distDir, ".nojekyll"), "\n", "utf8");

const indexHtml = readFileSync(indexHtmlPath, "utf8");
if (!indexHtml.includes('<div id="root"></div>')) {
  throw new Error("Expected dist/index.html to contain the application root.");
}

const customDomain = process.env.PAGES_CNAME?.trim();
if (customDomain) {
  writeFileSync(path.join(distDir, "CNAME"), `${customDomain}\n`, "utf8");
}

const basePath = process.env.VITE_BASE_PATH?.trim() || "/";
const normalizedBasePath =
  basePath === "/" ? "/" : `/${basePath.replace(/^\/+|\/+$/g, "")}/`;
const basePrefix = normalizedBasePath === "/" ? "" : normalizedBasePath.slice(0, -1);

const notFoundHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting…</title>
    <script>
      (function() {
        var basePath = ${JSON.stringify(normalizedBasePath)};
        var basePrefix = ${JSON.stringify(basePrefix)};
        var pathname = window.location.pathname;
        var routePath = pathname;

        if (basePrefix && pathname.startsWith(basePrefix)) {
          routePath = pathname.slice(basePrefix.length) || "/";
        }

        var target =
          basePath +
          "?p=" +
          encodeURIComponent(routePath) +
          (window.location.search ? "&q=" + encodeURIComponent(window.location.search.slice(1)) : "") +
          (window.location.hash ? "&h=" + encodeURIComponent(window.location.hash.slice(1)) : "");

        window.location.replace(target);
      })();
    </script>
  </head>
  <body></body>
</html>
`;

writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf8");
