import _ from 'lodash';
// Вспомогательная функция для отображения дифа массива с детьми объектами,
// которая корректно отображает объекты, добавленные в изначальном виде,
// без приведения к АСТ
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
  // Отображение дифа объекта с вложенными объектами
  // const iter = (currentElement, depth) => {
  //   if (!_.isObject(currentElement)) {
  //     return `${currentElement}`;
  //   }

  //   const indentSize = depth * 2;
  //   const currentIndent = ' '.repeat(indentSize);
  //   const bracketIndent = ' '.repeat(indentSize - 2);

  //   const lines = Object.entries(currentElement)
  //     .map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`);

  //   return ['{', ...lines, `${bracketIndent}}`].join('\n');
  // };

  // return iter(data, 1);

  // Отображение дифа массива с детьми-объектами типа
  // { key: 'follow', status: '-', value: false }

  const iter = (currentElement, depth) => {
    if (!Array.isArray(currentElement)) {
      return stringify(currentElement, depth + 1);
    }

    const indentSize = depth * 2;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);

    const lines = currentElement.map(({ key, status, value }) => `${currentIndent}${status} ${key}: ${iter(value, depth + 2)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
