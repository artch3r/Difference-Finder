import stylish from './stylish.js';
import plain from './plain.js';

const format = (diffTree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      throw new Error('Unknown output format');
  }
};

export default format;
