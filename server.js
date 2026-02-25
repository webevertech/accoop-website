const { createServer } = require("http");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const publicDir = path.join(__dirname, "public");

function servePublicFile(req, res) {
  const { pathname } = parse(req.url);
  const filePath = path.join(publicDir, pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(publicDir)) return false;

  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      const fileContent = fs.readFileSync(filePath);
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      res.end(fileContent);
      return true;
    }
  } catch {}

  return false;
}

// Try to load Next.js — works whether running from project root or standalone
let handle;
let appPrepare;

try {
  const next = require("next");
  const app = next({ dev: false });
  handle = app.getRequestHandler();
  appPrepare = app.prepare();
} catch {
  // Next.js module not available (standalone mode without full node_modules)
  // Fall back to serving .next/static files directly
  const nextStaticDir = path.join(__dirname, ".next", "static");
  handle = (req, res) => {
    const { pathname } = parse(req.url);
    if (pathname.startsWith("/_next/static/")) {
      const staticPath = path.join(nextStaticDir, pathname.replace("/_next/static/", ""));
      if (!staticPath.startsWith(nextStaticDir)) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
          const ext = path.extname(staticPath).toLowerCase();
          const contentType = MIME_TYPES[ext] || "application/octet-stream";
          res.writeHead(200, {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          });
          res.end(fs.readFileSync(staticPath));
          return;
        }
      } catch {}
    }
    res.writeHead(404);
    res.end("Not Found");
  };
  appPrepare = Promise.resolve();
}

const port = parseInt(process.env.PORT, 10) || 3000;

appPrepare.then(() => {
  createServer((req, res) => {
    // Serve public/ files first (images, manifest, favicons)
    if (servePublicFile(req, res)) return;

    // Then let Next.js handle everything else
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
