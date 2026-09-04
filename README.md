# Site Conteii

Site institucional one-page da Conteii, criado a partir do manual de identidade visual, dos logotipos e do conteúdo fornecido.

## Entrega pronta para domínio próprio

A pasta `publicar-no-dominio/` contém a versão estática pronta para upload em uma hospedagem comum. Envie todo o conteúdo dessa pasta para a pasta pública do domínio, geralmente chamada `public_html`, `www` ou equivalente.

O projeto-fonte usa React, Next, vinext e GSAP. As animações incluem uma entrada coordenada do hero, revelações suaves durante a rolagem e microinterações nos botões, com suporte a `prefers-reduced-motion`. A pasta `dist/` contém o build compatível com Cloudflare Workers para quem preferir esse tipo de hospedagem.

## Antes de publicar

O material fornecido não contém números de WhatsApp, endereços de e-mail, links sociais nem URL do Grupo Coomarcas. Por isso, nenhum desses dados foi inventado.

O formulário está pronto para ser conectado a um serviço de recebimento. Abra `publicar-no-dominio/site-config.js` e informe o endpoint HTTPS:

```js
window.CONTEII_CONFIG = {
  formEndpoint: "https://endereco-do-servico-de-formulario",
};
```

Também é possível configurar antes do build copiando `.env.example` para `.env.local` e preenchendo `NEXT_PUBLIC_CONTEII_FORM_ENDPOINT`.

A seção de cases permanece sem números até existirem cases reais, validados e autorizados. Os três conceitos nunca devem ser misturados: valor identificado, valor confirmado e valor efetivamente recuperado.

## Desenvolvimento local

Requisitos:

- Node.js 22.13 ou superior
- npm

Instalação:

```bash
npm ci
```

Prévia local:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Gerar novamente a pasta pronta para upload:

```bash
npm run export:static
```

## Estrutura principal

- `app/page.tsx`: conteúdo e comportamento da página
- `app/globals.css`: identidade visual e responsividade
- `app/layout.tsx`: metadados, idioma e imagem social
- `public/`: logotipos, símbolo, imagem social e configuração do formulário
- `publicar-no-dominio/`: versão estática pronta para upload
- `dist/`: build para Cloudflare Workers

## Validação

```bash
npm run build
node --test tests/rendered-html.test.mjs
```
