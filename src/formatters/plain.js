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
    const {
      key, value, value1, value2, type, children,
    } = currentValue;
    const previousPath = parents === '' ? '' : `${parents}.`;

    switch (type) {
      case 'deleted':
        return `Property '${previousPath}${currentValue.key}' was removed`;
      case 'added':
        return `Property '${previousPath}${currentValue.key}' was added with value: ${getValueView(value)}`;
      case 'changed':
        return `Property '${previousPath}${currentValue.key}' was updated. From ${getValueView(value1)} to ${getValueView(value2)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return children.flatMap((child) => iter(child, `${previousPath}${key}`)).join('\n');
      case 'root':
        return children.flatMap((child) => iter(child, '')).join('\n');
      default:
        throw new Error('Unknown type');
    }
  };

  return iter(data, '');
};

export default plain;
