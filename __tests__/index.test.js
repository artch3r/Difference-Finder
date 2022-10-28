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

describe('gendiff', () => {
  test.each([
    ['json'],
    ['yml'],
  ])('json and yaml', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(stylishDiff);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishDiff);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainDiff);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonDiff);
  });
});
