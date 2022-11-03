import _ from 'lodash';

const getValueView = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const plain = (data) => {
  const iter = (currentValue, parents) => {
    const previousPath = parents === '' ? '' : `${parents}.`;

    switch (currentValue.type) {
      case 'deleted':
        return `Property '${previousPath}${currentValue.key}' was removed`;
      case 'added':
        return `Property '${previousPath}${currentValue.key}' was added with value: ${getValueView(currentValue.value)}`;
      case 'changed':
        return `Property '${previousPath}${currentValue.key}' was updated. From ${getValueView(currentValue.value1)} to ${getValueView(currentValue.value2)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return currentValue.children.flatMap((child) => iter(child, `${previousPath}${currentValue.key}`)).join('\n');
      case 'root':
        return currentValue.children.flatMap((child) => iter(child, '')).join('\n');
      default:
        throw new Error('Unknown type');
    }
  };

  return iter(data, '');
};

export default plain;
