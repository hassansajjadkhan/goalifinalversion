// replaceApiBaseUrl.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'client', 'src');
const target = 'http://localhost:5000';
const replacement = 'import.meta.env.VITE_API_URL';

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) {
    console.error('❌ Directory not found:', dir);
    return;
  }

  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(target)) {
    const updated = content
      .replaceAll(`"${target}"`, replacement)
      .replaceAll(`'${target}'`, replacement)
      .replaceAll(target, `\${${replacement}}`);

    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

console.log('🔍 Starting replacement in:', baseDir);
walkDir(baseDir, (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    replaceInFile(filePath);
  }
});
console.log('🎉 Done!');
