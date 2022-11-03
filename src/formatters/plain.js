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

const buildPreviousPath = (parents) => (parents === '' ? '' : `${parents}.`);

const plain = (data) => {
  const iter = (currentValue, parents) => {
    switch (currentValue.type) {
      case 'deleted':
        return `Property '${buildPreviousPath(parents)}${currentValue.key}' was removed`;
      case 'added':
        return `Property '${buildPreviousPath(parents)}${currentValue.key}' was added with value: ${stringify(currentValue.value)}`;
      case 'changed':
        return `Property '${buildPreviousPath(parents)}${currentValue.key}' was updated. From ${stringify(currentValue.value1)} to ${stringify(currentValue.value2)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return currentValue.children.flatMap((child) => iter(child, `${buildPreviousPath(parents)}${currentValue.key}`)).join('\n');
      case 'root':
        return currentValue.children.flatMap((child) => iter(child, '')).join('\n');
      default:
        throw new Error('Unknown type');
    }
  };

  return iter(data, '');
};

export default plain;
