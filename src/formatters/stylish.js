import _ from 'lodash';

const indent = (depth, spacesCount = 4) => depth * spacesCount - 2;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indentSize = indent(depth);
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 2);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (currentValue, depth) => {
    const indentSize = indent(depth);
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);

    const {
      key, value, value1, value2, type, children,
    } = currentValue;

    switch (type) {
      case 'deleted':
        return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return [`${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`, `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`];
      case 'nested':
        return `${currentIndent}  ${key}: ${['{', ...children.flatMap((child) => iter(child, depth + 1)), `${currentIndent}  }`].join('\n')}`;
      case 'root':
        return ['{', ...children.flatMap((child) => iter(child, depth)), `${bracketIndent}}`].join('\n');
      default:
        throw new Error('Unknown type');
    }

    // const lines = currentValue.children.flatMap((child) => {
    //   const {
    //     key, value, value1, value2, type,
    //   } = child;

    //   switch (type) {
    //     case 'deleted':
    //       return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
    //     case 'added':
    //       return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
    //     case 'unchanged':
    //       return `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`;
    //     case 'changed':
    //       return [`${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`,
    //  `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`];
    //     case 'nested':
    //       return `${currentIndent}  ${key}: ${iter(child, depth + 1)}`;
    //     default:
    //       throw new Error('Unknown type');
    //   }
    // });

    // return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
