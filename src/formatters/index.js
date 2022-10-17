import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedData = (data, formatName) => {
  if (formatName === stylish) {
    return stylish(data);
  }

  return plain(data);
};

export default getFormattedData;
