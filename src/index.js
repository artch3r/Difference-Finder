import fs from 'fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';
import { getParsedJson, getParsedYaml } from './parsers.js';
import stylish from './stylish.js';

const getAbsolutePath = (filepath) => {
  const currentDirectory = cwd();
  return path.resolve(currentDirectory, filepath);
};

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath));

const getFileFormat = (filepath) => path.parse(filepath).ext;

const getParsedFile = (filepath) => {
  const file = readFile(filepath);
  const format = getFileFormat(filepath);

  switch (format) {
    case '.json':
      return getParsedJson(file);
    case '.yaml':
      return getParsedYaml(file);
    case '.yml':
      return getParsedYaml(file);
    default:
      throw new Error('Unknown file format. Check file extension');
  }
};

const checkIsObject = (data) => _.isObject(data) && !Array.isArray(data);

const getDiff = (parsedFile1, parsedFile2) => {
  const keys = _.union(_.keys(parsedFile1), _.keys(parsedFile2));
  const sortedKeys = _.sortBy(keys);
  // Формирование дифа-массива с элементами-объектами
  // вида { key: 'follow', status: '+', value: 'false' },
  // value может содержать массив с детьми-объектами
  //
  // const differences = sortedKeys.reduce((acc, key) => {
  //   const value1 = parsedFile1[key];
  //   const value2 = parsedFile2[key];

  //   if (!_.has(parsedFile2, key)) {
  //     return [...acc, { key, status: '-', value: value1 }];
  //   }

  //   if (!_.has(parsedFile1, key)) {
  //     return [...acc, { key, status: '+', value: value2 }];
  //   }

  //   if (checkIsObject(value1) && checkIsObject(value2)) {
  //     return [...acc, { key, status: ' ', value: getDiff(value1, value2) }];
  //   }

  //   return parsedFile1[key] === parsedFile2[key]
  //     ? [...acc, { key, status: ' ', value: value1 }]
  //     : [...acc, { key, status: '-', value: value1 }, { key, status: '+', value: value2 }];
  // }, []);
  //
  //
  // Формирование дифа-объекта типа
  // group1: {
  //   status: 'nested',
  //   value: { baz: [Object], foo: [Object], nest: [Object] }
  // },
  //
  // const differences = sortedKeys.reduce((acc, key) => {
  //   const value1 = parsedFile1[key];
  //   const value2 = parsedFile2[key];

  //   if (!_.has(parsedFile2, key)) {
  //     return { ...acc, [key]: { status: 'deleted', value: value1 } };
  //   }

  //   if (!_.has(parsedFile1, key)) {
  //     return { ...acc, [key]: { status: 'added', value: value2 } };
  //   }

  //   if (checkIsObject(value1) && checkIsObject(value2)) {
  //     return { ...acc, [key]: { status: 'nested', value: getDiff(value1, value2) } };
  //   }

  //   return parsedFile1[key] === parsedFile2[key]
  //     ? { ...acc, [key]: { status: 'unchanged', value: value1 } }
  //     : { ...acc, [key]: { status: 'changed', oldValue: value1, newValue: value2 } };
  // }, {});

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
          key, type: 'changed', previousValue: value1, newValue: value2,
        }],
      };
  }, { type: 'nested', children: [] });

  return differences;
};

const genDiff = (filepath1, filepath2, formatter = stylish) => {
  const parsedFile1 = getParsedFile(filepath1);
  const parsedFile2 = getParsedFile(filepath2);
  const differences = getDiff(parsedFile1, parsedFile2);

  return formatter(differences);
};

const screenDiff = (filepath1, filepath2) => {
  const difference = genDiff(filepath1, filepath2);
  console.log(difference);
};

export default genDiff;

export { screenDiff };
