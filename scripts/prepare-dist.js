import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Public output candidates (Nitro default vs Vercel preset)
const nitroPublicDir = path.join(rootDir, ".output", "public");
const vercelStaticDir = path.join(rootDir, ".vercel", "output", "static");

// Server output candidates
const nitroServerDir = path.join(rootDir, ".output", "server");
const vercelFunctionsDir = path.join(rootDir, ".vercel", "output", "functions");

const distDir = path.join(rootDir, "dist");

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Preparing dist directory for artifact packaging...");

// Garante que o diretório dist sempre exista de forma recursiva
fs.mkdirSync(distDir, { recursive: true });

// 1. Copia arquivos estáticos públicos (.output/public ou .vercel/output/static) -> dist
if (fs.existsSync(nitroPublicDir)) {
  copyDirRecursive(nitroPublicDir, distDir);
  console.log(`Copied .output/public -> dist`);
}
if (fs.existsSync(vercelStaticDir)) {
  copyDirRecursive(vercelStaticDir, distDir);
  console.log(`Copied .vercel/output/static -> dist`);
}

// 2. Copia saída do servidor (.output/server ou .vercel/output/functions) -> dist/server
if (fs.existsSync(nitroServerDir)) {
  copyDirRecursive(nitroServerDir, path.join(distDir, "server"));
  console.log(`Copied .output/server -> dist/server`);
}
if (fs.existsSync(vercelFunctionsDir)) {
  copyDirRecursive(vercelFunctionsDir, path.join(distDir, "server"));
  console.log(`Copied .vercel/output/functions -> dist/server`);
}

// 2.1 Patch de segurança para reaproveitamento de socket keep-alive no Node.js runtime da Vercel
function patchServerIndex(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf-8");
  const target = 'Object.defineProperty(req.socket, "remoteAddress", {';
  if (content.includes(target)) {
    content = content.replace(target, 'try { Object.defineProperty(req.socket, "remoteAddress", { configurable: true,');
    const closeTarget = 'return ip ??= h?.split?.(",").shift()?.trim();\n\t} });';
    if (content.includes(closeTarget)) {
      content = content.replace(closeTarget, 'return ip ??= h?.split?.(",").shift()?.trim();\n\t} }); } catch {}');
    }
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Patched remoteAddress keep-alive safety in ${filePath}`);
  }
}

patchServerIndex(path.join(vercelFunctionsDir, "__server.func", "index.mjs"));
patchServerIndex(path.join(distDir, "server", "__server.func", "index.mjs"));


// 3. Garante que dist/index.html exista para fallback de hospedagem estática
const distIndexHtml = path.join(distDir, "index.html");
if (!fs.existsSync(distIndexHtml)) {
  let mainJs = "";
  let mainCss = "";

  const searchDirs = [
    path.join(distDir, "assets"),
    path.join(vercelStaticDir, "assets"),
    path.join(nitroPublicDir, "assets"),
  ];

  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (!mainJs) {
        mainJs = files.find((f) => f.startsWith("index-") && f.endsWith(".js")) || "";
      }
      if (!mainCss) {
        mainCss = files.find((f) => f.startsWith("styles-") && f.endsWith(".css")) || "";
      }
      if (mainJs && mainCss) break;
    }
  }

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sol &amp; Mar Rent a Car | Locação de Veículos em Fortaleza</title>
    <meta name="description" content="Locadora de veículos em Fortaleza - Sol &amp; Mar Rent a Car. Sua viagem. Seu caminho. Sua liberdade. Locação com atendimento humano e frota revisada." />
    <meta property="og:title" content="Sol &amp; Mar Rent a Car" />
    <meta property="og:description" content="Locação de veículos em Fortaleza com atendimento próximo, flexibilidade e veículos revisados." />
    <meta property="og:type" content="website" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" />
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}" />` : ""}
    <script>
      (function(){try{var s=localStorage.getItem('solemar-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(p?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}}catch(e){}})();
    </script>
  </head>
  <body>
    <div id="root"></div>
    ${mainJs ? `<script type="module" src="/assets/${mainJs}"></script>` : ""}
  </body>
</html>`;

  fs.writeFileSync(distIndexHtml, html, "utf-8");
  console.log(`Generated dist/index.html`);

  if (fs.existsSync(vercelStaticDir)) {
    const vercelIndexHtml = path.join(vercelStaticDir, "index.html");
    if (!fs.existsSync(vercelIndexHtml)) {
      fs.writeFileSync(vercelIndexHtml, html, "utf-8");
      console.log(`Generated .vercel/output/static/index.html`);
    }
  }
}

console.log("dist directory prepared successfully. File count:", fs.readdirSync(distDir).length);
