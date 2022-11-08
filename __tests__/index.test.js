import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishDiff = readFixture('expectedStylish.txt');
const plainDiff = readFixture('expectedPlain.txt');
const jsonDiff = readFixture('expectedJson.txt');
const testsList = ['json', 'yml'];

describe('gendiff', () => {
  test.each(testsList)('%s format', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(stylishDiff);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishDiff);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainDiff);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonDiff);
  });
});
