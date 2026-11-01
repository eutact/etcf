import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const port = Number(process.env.REFERENCE_PORT || 4191);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
};
createServer(async (request, response) => {
  try {
    const name =
      decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      ).replace(/^\//, "") || "index.html";
    if (name.split("/").includes("..")) throw new Error("Invalid path");
    const file =
      name === "src/output.css"
        ? path.join(root, "design-reference/output.css")
        : name.startsWith("src/js/")
          ? path.join(root, name)
          : name.endsWith(".html")
            ? path.join(root, "design-reference", name)
            : path.join(root, "public", name);
    if (!(await stat(file)).isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Design reference: http://127.0.0.1:${port}`),
);
