import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data2, key)) {
      return { ...acc, children: [...acc.children, { key, type: 'deleted', value: value1 }] };
    }

    if (!_.has(data1, key)) {
      return { ...acc, children: [...acc.children, { key, type: 'added', value: value2 }] };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { ...acc, children: [...acc.children, { key, type: 'nested', children: buildTree(value1, value2).children }] };
    }

    return data1[key] === data2[key]
      ? { ...acc, children: [...acc.children, { key, type: 'unchanged', value: value1 }] }
      : {
        ...acc,
        children: [...acc.children, {
          key, type: 'changed', value1, value2,
        }],
      };
  }, { type: 'root', key: '', children: [] });
};

export default buildTree;
