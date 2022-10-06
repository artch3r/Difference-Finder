import fs from 'fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';

const getAbsolutePath = (filepath) => {
  const currentDirectory = cwd();
  return path.resolve(currentDirectory, filepath);
};

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const getParsedFile = (filepath) => JSON.parse(filepath);

const getData = (filepath) => {
  const file = readFile(filepath);
  const parsedFile = getParsedFile(file);
  return parsedFile;
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
  const dataOfFile1 = getData(filepath1);
  const dataOfFile2 = getData(filepath2);
  const differences = getDiff(dataOfFile1, dataOfFile2);

  return `{\n${differences.join('\n')}\n}`;
};

const screenDiff = (filepath1, filepath2) => {
  const difference = genDiff(filepath1, filepath2);
  console.log(difference);
};

export default genDiff;

export { screenDiff };
