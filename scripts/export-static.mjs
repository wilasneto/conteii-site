import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const clientDirectory = path.join(root, "dist", "client");
const outputDirectory = path.join(root, "publicar-no-dominio");

if (!outputDirectory.startsWith(`${root}${path.sep}`)) {
  throw new Error("A pasta de exportação precisa permanecer dentro do projeto.");
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

const workerUrl = pathToFileURL(path.join(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://conteii.local/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Não foi possível renderizar a página: HTTP ${response.status}`);
}

let html = (await response.text()).replaceAll("https://conteii.local/og.png", "/og.png");
if (!html.includes('property="og:image"')) {
  const socialTags = '<meta property="og:image" content="/og.png"/><meta name="twitter:image" content="/og.png"/>';
  html = html.replace("</head>", `${socialTags}</head>`);
}
await writeFile(path.join(outputDirectory, "index.html"), html, "utf8");

console.log(`Exportação estática concluída em ${outputDirectory}`);
