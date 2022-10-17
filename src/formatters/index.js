import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedDiff = (differences, formatName) => {
  if (formatName === stylish) {
    return stylish(differences);
  }

  return plain(differences);
};

export default getFormattedDiff;
