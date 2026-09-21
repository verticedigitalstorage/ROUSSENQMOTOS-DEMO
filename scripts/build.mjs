import { access, readdir } from "node:fs/promises";

const required = ["dist/index.html", "dist/styles.css", "dist/app.js", "dist/favicon.svg"];
await Promise.all(required.map((file) => access(file)));
const assets = await readdir("dist/assets");
if (assets.length < 7) throw new Error("Arquivos visuais ausentes em dist/assets.");
console.log("Protótipo validado. Publique a pasta dist/.");
