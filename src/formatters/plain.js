import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  if (typeof data === 'string') {
    return `'${data}'`;
  }

  return String(data);
};

const buildPath = (parents, current) => {
  if (parents === '') {
    return current;
  }

  return [parents, current].join('.');
};

const iter = (node, parents) => {
  switch (node.type) {
    case 'deleted':
      return `Property '${buildPath(parents, node.key)}' was removed`;
    case 'added':
      return `Property '${buildPath(parents, node.key)}' was added with value: ${stringify(node.value)}`;
    case 'changed':
      return `Property '${buildPath(parents, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    case 'unchanged':
      return [];
    case 'nested':
      return node.children.flatMap((child) => iter(child, buildPath(parents, node.key))).join('\n');
    case 'root':
      return node.children.flatMap((child) => iter(child, '')).join('\n');
    default:
      throw new Error(`${node.type} is unknown type`);
  }
};

const formatPlain = (tree) => iter(tree, '');

export default formatPlain;
