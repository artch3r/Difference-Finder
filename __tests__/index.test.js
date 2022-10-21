import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishDiff = readFixture('stylish_diff.yml');
const plainDiff = readFixture('plain_diff.yml');
const jsonDiff = readFixture('json_diff.json');

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
])('genDiff', (file1, file2) => {
  const filepath1 = getFixturePath(`${file1}`);
  const filepath2 = getFixturePath(`${file2}`);
  expect(genDiff(filepath1, filepath2)).toEqual(stylishDiff);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishDiff);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainDiff);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonDiff);
});
