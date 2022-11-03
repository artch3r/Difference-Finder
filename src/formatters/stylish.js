import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth, formate) => {
  if (!_.isObject(value)) {
    return value;
  }

  const lines = Object
    .entries(value)
    .map(([key, val]) => {
      const preparedValue = { key, value: val, type: 'unchanged' };
      return formate(preparedValue, depth + 1);
    });

  return `{\n${[...lines].join('\n')}\n  ${indent(depth)}}`;
};

const iter = (currentValue, depth) => {
  switch (currentValue.type) {
    case 'deleted':
      return `${indent(depth)}- ${currentValue.key}: ${stringify(currentValue.value, depth, iter)}`;
    case 'added':
      return `${indent(depth)}+ ${currentValue.key}: ${stringify(currentValue.value, depth, iter)}`;
    case 'unchanged':
      return `${indent(depth)}  ${currentValue.key}: ${stringify(currentValue.value, depth, iter)}`;
    case 'changed': {
      const output1 = `${indent(depth)}- ${currentValue.key}: ${stringify(currentValue.value1, depth, iter)}`;
      const output2 = `${indent(depth)}+ ${currentValue.key}: ${stringify(currentValue.value2, depth, iter)}`;
      return [output1, output2];
    }
    case 'nested': {
      const output = [...currentValue.children.flatMap((child) => iter(child, depth + 1))].join('\n');
      return `${indent(depth)}  ${currentValue.key}: {\n${output}\n  ${indent(depth)}}`;
    }
    case 'root': {
      const output = [...currentValue.children].flatMap((child) => iter(child, depth + 1)).join('\n');
      return `{\n${output}\n}`;
    }
    default:
      throw new Error(`${currentValue.type} is unknown type`);
  }
};

const stylish = (data) => iter(data, 0);

export default stylish;
