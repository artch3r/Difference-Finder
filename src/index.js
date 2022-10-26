import fs from 'fs';
import path from 'path';
import buildTree from './buildtree.js';
import parseData from './parsers.js';
import format from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const extractFormat = (filepath) => path.parse(filepath).ext.slice(1);

const getData = (filepath) => parseData(fs.readFileSync(filepath), extractFormat(filepath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const absolutePath1 = buildAbsolutePath(filepath1);
  const absolutePath2 = buildAbsolutePath(filepath2);
  const data1 = getData(absolutePath1);
  const data2 = getData(absolutePath2);
  const diffTree = buildTree(data1, data2);

  return format(diffTree, outputFormat);
};

export default genDiff;
