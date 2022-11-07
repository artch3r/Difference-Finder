import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
};

const buildPath = (parents, current) => {
  if (parents === '') {
    return current;
  }

  return [parents, current].join('.');
};

const iter = (currentValue, parents) => {
  switch (currentValue.type) {
    case 'deleted':
      return `Property '${buildPath(parents, currentValue.key)}' was removed`;
    case 'added':
      return `Property '${buildPath(parents, currentValue.key)}' was added with value: ${stringify(currentValue.value)}`;
    case 'changed':
      return `Property '${buildPath(parents, currentValue.key)}' was updated. From ${stringify(currentValue.value1)} to ${stringify(currentValue.value2)}`;
    case 'unchanged':
      return [];
    case 'nested':
      return currentValue.children.flatMap((child) => iter(child, buildPath(parents, currentValue.key))).join('\n');
    case 'root':
      return currentValue.children.flatMap((child) => iter(child, '')).join('\n');
    default:
      throw new Error('Unknown type');
  }
};

const plain = (data) => iter(data, '');

export default plain;
