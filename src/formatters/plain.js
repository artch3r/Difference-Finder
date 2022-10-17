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

    if (!currentValue.children) {
      switch (type) {
        case 'deleted':
          return `Property '${previousPath}${currentValue.key}' was removed`;
        case 'added':
          return `Property '${previousPath}${currentValue.key}' was added with value: ${getValueView(value)}`;
        case 'changed':
          return `Property '${previousPath}${currentValue.key}' was updated. From ${getValueView(value1)} to ${getValueView(value2)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error('Unknown type');
      }
    }

    const result = children.flatMap((child) => iter(child, `${previousPath}${key}`));

    return result.join('\n');
  };

  return iter(data, '');
};

export default plain;
