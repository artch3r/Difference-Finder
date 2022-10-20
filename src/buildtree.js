import _ from 'lodash';

const checkIsObject = (data) => _.isObject(data) && !Array.isArray(data);

const buildTree = (parsedFile1, parsedFile2) => {
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
      return { ...acc, children: [...acc.children, { key, type: 'nested', children: buildTree(value1, value2).children }] };
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

export default buildTree;
