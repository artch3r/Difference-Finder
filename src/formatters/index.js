import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`${outputFormat} is unknown format`);
  }
};

export default format;
