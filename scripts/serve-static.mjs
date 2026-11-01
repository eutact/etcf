import { createServer } from "node:http";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const args = process.argv.slice(2);
const portIndex = args.findIndex(
  (value) => value === "--port" || value === "-p",
);
const port = Number(
  portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 3000,
);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};
await stat(path.join(root, "index.html"));
createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405);
      response.end();
      return;
    }
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const file = path.resolve(
      root,
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403);
      response.end();
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type":
        types[path.extname(file).toLowerCase()] || "application/octet-stream",
    });
    response.end(request.method === "HEAD" ? undefined : await readFile(file));
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(
      await readFile(path.join(root, "404.html")).catch(() => "Not found"),
    );
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`ETCF Next.js export: http://localhost:${port}`),
);
