import fs from 'fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';

const buildAbsolutePath = (filepath) => {
  const currentDirectory = cwd();
  return path.resolve(currentDirectory, filepath);
};

const getParsedFile = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

const getDiff = (parsedFile1, parsedFile2) => {
  const keys = _.union(_.keys(parsedFile1), _.keys(parsedFile2));
  const sortedKeys = _.sortBy(keys);
  const differences = sortedKeys.reduce((acc, key) => {
    if (_.has(parsedFile1, key) && !_.has(parsedFile2, key)) {
      return [...acc, `- ${key}: ${parsedFile1[key]}`];
    }

    if (!_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      return [...acc, `+ ${key}: ${parsedFile2[key]}`];
    }

    return parsedFile1[key] === parsedFile2[key]
      ? [...acc, `  ${key}: ${parsedFile1[key]}`]
      : [...acc, `- ${key}: ${parsedFile1[key]}`, `+ ${key}: ${parsedFile2[key]}`];
  }, []);

  return differences;
};

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = buildAbsolutePath(filepath1);
  const absolutePath2 = buildAbsolutePath(filepath2);
  const parsedFile1 = getParsedFile(absolutePath1);
  const parsedFile2 = getParsedFile(absolutePath2);
  const differences = getDiff(parsedFile1, parsedFile2);

  return `{\n${differences.join('\n')}\n}`;
};

const screenDiff = (filepath1, filepath2) => {
  const differences = genDiff(filepath1, filepath2);
  console.log(differences);
};

export default genDiff;

export { screenDiff };
