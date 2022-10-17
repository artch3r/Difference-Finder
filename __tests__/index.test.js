import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');
const ymlFilepath1 = getFixturePath('file1.yml');
const ymlFilepath2 = getFixturePath('file2.yml');
const stylishDiff = readFile('stylish_diff.yml');
const plainDiff = readFile('plain_diff.yml');
const jsonDiff = readFile('json_diff.json');

test('Default stylish output format', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2)).toEqual(stylishDiff);
});

test.each([
  [jsonFilepath1, jsonFilepath2, stylishDiff, 'stylish'],
  [ymlFilepath1, ymlFilepath2, stylishDiff, 'stylish'],
  [jsonFilepath1, ymlFilepath2, plainDiff, 'plain'],
  [ymlFilepath1, jsonFilepath2, jsonDiff, 'json'],
])('gendiff', (filepath1, filepath2, expected, outputFormat) => {
  expect(genDiff(filepath1, filepath2, outputFormat)).toEqual(expected);
});
