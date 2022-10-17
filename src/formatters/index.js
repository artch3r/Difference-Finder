import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedDiff = (differences, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(differences);
    case 'plain':
      return plain(differences);
    case 'json':
      return JSON.stringify(differences);
    default:
      throw new Error('Unknown output format');
  }
};

export default getFormattedDiff;
