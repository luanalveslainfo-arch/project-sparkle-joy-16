import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const productsDir = path.join(publicDir, 'images/products');

const requiredImages = [
  'crimson_front.png',
  'crimson_back.png',
  'obsidian_front.png',
  'obsidian_back.png',
  'ivory_front.png',
  'ivory_back.png'
];

console.log('--- Verificando Imagens de Produtos ---');
let missing = 0;
for (const img of requiredImages) {
  const fullPath = path.join(productsDir, img);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${img} encontrada.`);
  } else {
    console.error(`❌ ${img} AUSENTE em ${fullPath}`);
    missing++;
  }
}

const heroPath = path.join(publicDir, 'hero.png');
if (fs.existsSync(heroPath)) {
  console.log('✅ hero.png encontrada.');
} else {
  console.error('❌ hero.png AUSENTE.');
  missing++;
}

if (missing > 0) {
  console.error(`Falha: ${missing} assets críticos ausentes.`);
  process.exit(1);
}

console.log('--- Verificação concluída com sucesso ---');
