### Hexlet tests and linter status:
[![Actions Status](https://github.com/artch3r/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/artch3r/frontend-project-46/actions)

![nodejs-build status badge](https://github.com/artch3r/frontend-project-46/actions/workflows/nodejs-build.yml/badge.svg)

<a href="https://codeclimate.com/github/artch3r/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/d5ceb180e9d977478917/maintainability" /></a>

<a href="https://codeclimate.com/github/artch3r/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d5ceb180e9d977478917/test_coverage" /></a>

# Description
**Difference Finder** is a program that determines the difference between two data structures.

*__Utility Features:__*
* Support for different input formats: YAML, JSON
* Output in plain text, stylish, and JSON format
* Utility usage is available as a script or a library

*__Usage example:__*
```
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

## Install and usage instructions
1. Copy repository to your device for local usage
```
git clone
```
2. Install package dependencies 
```
make install
```
3. Install package to your device
```
npm link
```
4. To start use command
```
gendiff
```
5. Arguments:
enter paths to files for comparison
```
gendiff filepath1 filepath2 
```
5. Options:
```
--help -h
```
Show package description
```
--format -f
```
Choose output format. Possible values:
* stylish (default)
* plain
* json

*__gendiff for json__*
[![asciicast](https://asciinema.org/a/sXjxoCNDkZ4698xggL80Y80ZA.svg)](https://asciinema.org/a/sXjxoCNDkZ4698xggL80Y80ZA)

*__gendiff for yaml__*
[![asciicast](https://asciinema.org/a/PWTrZ8TDCfYL28NXxk25S7VuY.svg)](https://asciinema.org/a/PWTrZ8TDCfYL28NXxk25S7VuY)

*__gendiff for nested__*
[![asciicast](https://asciinema.org/a/vrQWQLDFfnP6Q3vMzUj3rUlAB.svg)](https://asciinema.org/a/vrQWQLDFfnP6Q3vMzUj3rUlAB)

*__gendiff with plain output__*
[![asciicast](https://asciinema.org/a/oP634Ypk04iby4zU26SI9Gqsw.svg)](https://asciinema.org/a/oP634Ypk04iby4zU26SI9Gqsw)

*__gendiff with json output__*
[![asciicast](https://asciinema.org/a/KGoA2YPlbjJwrQuhxWA1h9P1c.svg)](https://asciinema.org/a/KGoA2YPlbjJwrQuhxWA1h9P1c)

