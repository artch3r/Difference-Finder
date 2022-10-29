import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `  ${indent(depth)}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (currentValue, depth) => {
    const {
      key, value, value1, value2, type, children,
    } = currentValue;

    switch (type) {
      case 'deleted':
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'added':
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [`${indent(depth)}- ${key}: ${stringify(value1, depth)}`, `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`];
      case 'nested':
        return `${indent(depth)}  ${key}: ${['{', ...children.flatMap((child) => iter(child, depth + 1)), `${indent(depth)}  }`].join('\n')}`;
      case 'root':
        return ['{', ...children.flatMap((child) => iter(child, depth + 1)), '}'].join('\n');
      default:
        throw new Error('Unknown type');
    }
  };

  return iter(data, 0);
};

export default stylish;
