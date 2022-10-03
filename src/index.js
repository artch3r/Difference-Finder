import fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, fileopath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));
  const keys = _.union(_.keys(file1), _.keys(file2));
};

export default genDiff;