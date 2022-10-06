import yaml from 'js-yaml';

const getParsedJson = (file) => JSON.parse(file);

const getParsedYaml = (file) => yaml.load(file);

export { getParsedJson, getParsedYaml };
