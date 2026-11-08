import { createServer } from "node:http";
import { stat, readFile, realpath } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const deployment = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);
const headers = Object.fromEntries(
  deployment.headers[0].headers.map(({ key, value }) => [key, value]),
);
const privateErrorPaths = deployment.routes.map(
  (route) => new RegExp(route.src),
);
const args = process.argv.slice(2);
const portIndex = args.findIndex(
  (value) => value === "--port" || value === "-p",
);
const port = Number(
  portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 3000,
);
const types = {
  ".txt": "text/plain; charset=utf-8",
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
  const send = (status, body, extra = {}) => {
    response.writeHead(status, { ...headers, ...extra });
    response.end(request.method === "HEAD" ? undefined : body);
  };
  const notFound = async () =>
    send(404, await readFile(path.join(root, "404.html")), {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, follow",
    });
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      send(405, "Method not allowed", {
        Allow: "GET, HEAD",
        "Content-Type": "text/plain; charset=utf-8",
      });
      return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
    } catch {
      send(400, "Bad request", { "Content-Type": "text/plain; charset=utf-8" });
      return;
    }
    if (
      privateErrorPaths.some((pattern) => pattern.test(pathname)) ||
      pathname.includes("\0") ||
      pathname.includes("\\")
    ) {
      await notFound();
      return;
    }
    const file = path.resolve(
      root,
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
      await notFound();
      return;
    }
    const resolved = await realpath(file);
    if (!resolved.startsWith(`${root}${path.sep}`)) {
      await notFound();
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    send(200, await readFile(file), {
      "Content-Type":
        types[path.extname(file).toLowerCase()] || "application/octet-stream",
    });
  } catch (error) {
    if (
      ["ENOENT", "ENOTDIR"].includes(error.code) ||
      error.message === "Not a file"
    ) {
      await notFound();
      return;
    }
    send(
      500,
      await readFile(path.join(root, "500.html")).catch(
        () => "Service unavailable",
      ),
      {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    );
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`ETCF Next.js export: http://localhost:${port}`),
);
