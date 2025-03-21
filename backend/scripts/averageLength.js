import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/length.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const lines = data.split('\n').filter(line => line.trim() !== '');

  const numbers = lines.map(Number).filter(num => !isNaN(num));

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = numbers.length > 0 ? sum / numbers.length : 0;

  console.log('Average length:', average);
});

//avgdl: 124.7618260006616
