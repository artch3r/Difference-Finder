import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth, iter) => {
  if (!_.isObject(data)) {
    return data;
  }

  const output = Object
    .entries(data)
    .map(([key, value]) => iter({ key, value, type: 'unchanged' }, depth + 1));

  return `{\n${output.join('\n')}\n  ${indent(depth)}}`;
};

const iter = (node, depth) => {
  switch (node.type) {
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, iter)}`;
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, iter)}`;
    case 'unchanged':
      return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, iter)}`;
    case 'changed': {
      const output1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth, iter)}`;
      const output2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth, iter)}`;
      return [output1, output2];
    }
    case 'nested': {
      const output = node.children.flatMap((child) => iter(child, depth + 1)).join('\n');
      return `${indent(depth)}  ${node.key}: {\n${output}\n  ${indent(depth)}}`;
    }
    case 'root': {
      const output = node.children.flatMap((child) => iter(child, depth + 1)).join('\n');
      return `{\n${output}\n}`;
    }
    default:
      throw new Error(`${node.type} is unknown type`);
  }
};

const formatStylish = (tree) => iter(tree, 0);

export default formatStylish;
