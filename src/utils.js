import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

export { getFixturePath, readFile };
