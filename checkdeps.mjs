import { readFileSync, existsSync } from 'fs';
const p = JSON.parse(readFileSync('./frontend/package.json', 'utf8'));
console.log('openai dep:', p.dependencies?.openai ?? 'NOT IN DEPS');
console.log('openai in node_modules:', existsSync('./frontend/node_modules/openai'));
console.log('next version:', p.dependencies?.next);
