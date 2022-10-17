### Hexlet tests and linter status:
[![Actions Status](https://github.com/artch3r/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/artch3r/frontend-project-46/actions)

![nodejs-build status badge](https://github.com/artch3r/frontend-project-46/actions/workflows/nodejs-build.yml/badge.svg)

<a href="https://codeclimate.com/github/artch3r/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/d5ceb180e9d977478917/maintainability" /></a>

<a href="https://codeclimate.com/github/artch3r/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d5ceb180e9d977478917/test_coverage" /></a>

# Описание Пакета
**Вычислитель отличий** – программа, определяющая разницу между двумя структурами данных.

*__Возможности утилиты:__*
* Поддержка разных входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

*__Пример использования:__*
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

## Минимальные требования
* nodejs версии не ниже 18

## Инструкции по установке и запуску
1. Скопируйте репозиторий к себе на устройство для локального использования с помощью команды 
```
git clone
```
2. Установите зависимости пакета для его корректного использования с помощью команды 
```
make install
```
3. Установите пакет к себе на устройство с помощью команды 
```
npm link
```
4. Для выполнения пакета используйте комманду
```
gendiff
```
5. Аргументы:
укажите пути к файлам для сравнения
```
gendiff filepath1 filepath2 
```
5. Опции:
```
--help -h
```
Отображение описания пакета
```
--format -f
```
Определение формата вывода. Возможные значения:
* stylish (значение по умолчанию)
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

