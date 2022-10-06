import fs from 'fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';
import { getParsedJson, getParsedYaml } from './parsers.js';

const getAbsolutePath = (filepath) => {
  const currentDirectory = cwd();
  return path.resolve(currentDirectory, filepath);
};

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const getFileName = (filepath) => {
  const pathes = filepath.split('/');
  return pathes[pathes.length - 1];
};

const getFileFormat = (filepath) => {
  const filename = getFileName(filepath);
  return filename.split('.')[1];
};

const getParsedFile = (filepath) => {
  const file = readFile(filepath);
  const format = getFileFormat(filepath);

  switch (format) {
    case 'json':
      return getParsedJson(file);
    case 'yaml':
      return getParsedYaml(file);
    case 'yml':
      return getParsedYaml(file);
    default:
      throw new Error('Unknown file format. Check file extension');
  }
};

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
  const parsedFile1 = getParsedFile(filepath1);
  const parsedFile2 = getParsedFile(filepath2);
  const differences = getDiff(parsedFile1, parsedFile2);

  return `{\n${differences.join('\n')}\n}`;
};

const screenDiff = (filepath1, filepath2) => {
  const difference = genDiff(filepath1, filepath2);
  console.log(difference);
};

export default genDiff;

export { screenDiff };
