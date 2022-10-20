import fs from 'fs';
import path from 'node:path';
import _ from 'lodash';
import { getParsedJson, getParsedYaml } from './parsers.js';
import getFormattedDiff from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(buildAbsolutePath(filepath));

const extractInputFormat = (filepath) => path.parse(filepath).ext.slice(1);

const getParsedFile = (filepath) => {
  const file = readFile(filepath);
  const inputFormat = extractInputFormat(filepath);

  switch (inputFormat) {
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

const checkIsObject = (data) => _.isObject(data) && !Array.isArray(data);

const getDiff = (parsedFile1, parsedFile2) => {
  const keys = _.union(_.keys(parsedFile1), _.keys(parsedFile2));
  const sortedKeys = _.sortBy(keys);
  const differences = sortedKeys.reduce((acc, key) => {
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];

    if (!_.has(parsedFile2, key)) {
      return { ...acc, children: [...acc.children, { key, type: 'deleted', value: value1 }] };
    }

    if (!_.has(parsedFile1, key)) {
      return { ...acc, children: [...acc.children, { key, type: 'added', value: value2 }] };
    }

    if (checkIsObject(value1) && checkIsObject(value2)) {
      return { ...acc, children: [...acc.children, { key, type: 'nested', children: getDiff(value1, value2).children }] };
    }

    return parsedFile1[key] === parsedFile2[key]
      ? { ...acc, children: [...acc.children, { key, type: 'unchanged', value: value1 }] }
      : {
        ...acc,
        children: [...acc.children, {
          key, type: 'changed', value1, value2,
        }],
      };
  }, { type: 'root', key: '', children: [] });

  return differences;
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const parsedFile1 = getParsedFile(filepath1);
  const parsedFile2 = getParsedFile(filepath2);
  const differences = getDiff(parsedFile1, parsedFile2);

  return getFormattedDiff(differences, outputFormat);
};

export default genDiff;
