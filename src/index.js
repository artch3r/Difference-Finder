import fs from 'fs';
import path from 'path';
import buildTree from './buildtree.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const extractFormat = (filepath) => path.parse(filepath).ext.slice(1);

const getData = (filepath) => parse(fs.readFileSync(filepath), extractFormat(filepath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(buildAbsolutePath(filepath1));
  const data2 = getData(buildAbsolutePath(filepath2));
  const diffTree = buildTree(data1, data2);

  return format(diffTree, outputFormat);
};

export default genDiff;
