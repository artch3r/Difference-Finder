import { beforeAll } from '@jest/globals';
import { getFixturePath, readFile } from '../src/utils.js';

let file1;
let file2;

beforeAll(() => {
  file1 = readFile((getFixturePath(file1.json)));
  file2 = readFile((getFixturePath(file2.json)));
});
