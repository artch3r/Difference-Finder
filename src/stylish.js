import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indentSize = depth * 2;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 2)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  // Отображение дифа-массива с элементами-объектами
  // вида { key: 'follow', status: '+', value: 'false' },
  // value может содержать массив с детьми-объектами
  //
  // const iter = (currentElement, depth) => {
  //   if (!Array.isArray(currentElement)) {
  //     return stringify(currentElement, depth + 1);
  //   }

  //   const indentSize = depth * 2;
  //   const currentIndent = ' '.repeat(indentSize);
  //   const bracketIndent = ' '.repeat(indentSize - 2);

  //   const lines = currentElement.map(({ key, status, value }) =>
  // `${currentIndent}${status} ${key}: ${iter(value, depth + 2)}`);

  //   return ['{', ...lines, `${bracketIndent}}`].join('\n');
  // };
  //
  //
  // Формирование дифа-объекта типа
  // group1: {
  //   status: 'nested',
  //   value: { baz: [Object], foo: [Object], nest: [Object] }
  // },
  //
  // const iter = (currentElement, depth) => {
  //   const indentSize = depth * 2;
  //   const currentIndent = ' '.repeat(indentSize);
  //   const bracketIndent = ' '.repeat(indentSize - 2);

  //   const keys = _.keys(currentElement);
  //   const lines = keys.flatMap((key) => {
  //     const {
  //       status, value, oldValue, newValue,
  //     } = currentElement[key];

  //     switch (status) {
  //       case 'deleted':
  //         return `${currentIndent}- ${key}: ${stringify(value, depth + 3)}`;
  //       case 'added':
  //         return `${currentIndent}+ ${key}: ${stringify(value, depth + 3)}`;
  //       case 'unchanged':
  //         return `${currentIndent}  ${key}: ${stringify(value, depth + 3)}`;
  //       case 'changed':
  //         return [`${currentIndent}- ${key}: ${stringify(oldValue, depth + 3)}`,
  //  `${currentIndent}+ ${key}: ${stringify(newValue, depth + 3)}`];
  //       case 'nested':
  //         return `${currentIndent}  ${key}: ${iter(value, depth + 2)}`;
  //       default:
  //         throw new Error('Unknown status');
  //     }
  //   });

  //   return ['{', ...lines, `${bracketIndent}}`].join('\n');
  // };

  const iter = (currentValue, depth) => {
    const indentSize = depth * 2;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);

    const lines = currentValue.children.flatMap((child) => {
      const {
        key, value, value1, value2, type,
      } = child;

      switch (type) {
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value, depth + 3)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value, depth + 3)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value, depth + 3)}`;
        case 'changed':
          return [`${currentIndent}- ${key}: ${stringify(value1, depth + 3)}`, `${currentIndent}+ ${key}: ${stringify(value2, depth + 3)}`];
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(child, depth + 2)}`;
        default:
          throw new Error('Unknown type');
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
