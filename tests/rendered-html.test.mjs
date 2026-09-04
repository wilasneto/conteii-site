import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://conteii.example/", {
      headers: { accept: "text/html", host: "conteii.example" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Conteii one-page site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /Conteii \| Auditoria e Recuperação de Recebíveis/);
  assert.match(html, /Sua empresa recebeu/);
  assert.match(html, /Identificado não é recuperado/);
  assert.match(html, /Da auditoria ao dinheiro recuperado/);
  assert.match(html, /Perguntas frequentes/);
  assert.match(html, /Vamos começar pela sua operação/);
  assert.match(html, /https:\/\/conteii\.example\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the finished source free of starter artifacts", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /NEXT_PUBLIC_CONTEII_FORM_ENDPOINT/);
  assert.match(layout, /symbol-conteii-orange\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
  await access(new URL("../public/logo-conteii-white.png", import.meta.url));
  await access(new URL("../public/logo-conteii-dark.png", import.meta.url));
  await access(new URL("../public/symbol-conteii-orange.png", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
});
