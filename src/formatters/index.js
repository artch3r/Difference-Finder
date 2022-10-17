import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedDiff = (differences, outputFormat) => {
  if (outputFormat === stylish) {
    return stylish(differences);
  }

  if (outputFormat === json) {
    return json(differences);
  }

  return plain(differences);
};

export default getFormattedDiff;
