#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const outputFormat = program.opts().format;

    if (outputFormat === 'plain') {
      console.log(genDiff(filepath1, filepath2, plain));
      return;
    }

    if (outputFormat === 'json') {
      console.log(genDiff(filepath1, filepath2, json));
      return;
    }

    console.log(genDiff(filepath1, filepath2, stylish));
  })
  .parse(process.argv);
