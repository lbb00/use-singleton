# use-singleton

[![Npm](https://badgen.net/npm/v/use-singleton)](https://www.npmjs.com/package/use-singleton)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/use-singleton)](https://bundlephobia.com/result?p=use-singleton)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/use-singleton.svg)](https://codecov.io/gh/lbb00/use-singleton)
[![License](https://img.shields.io/github/license/lbb00/use-singleton.svg)](https://github.com/lbb00/use-singleton/blob/master/LICENSE)
[![License](https://img.shields.io/npm/dt/use-singleton.svg)](https://www.npmjs.com/package/use-singleton)

[中文简体](https://github.com/lbb00/use-singleton/blob/master/README.zh.md)

> Create singleton better, and more easily.

- Typescript
- Optional immediately create
- Optional recreate
- Allow async create
- Without dependence
- Not OOP
- Only ~1kb before gzipped

## Install

### NPM

```bash
npm install use-singleton --save
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/use-singleton/dist/index.min.js"></script>
<script>
  var useSingleton = UseSingleton.default;
</script>
```

## API

```javascript
import useSingleton from "use-singleton";

const getSingleton = useSingleton(createInstance, options);
```

- createInstance `{function}`,should return instance.
- options `{Object}` default: `{}`
  - withKey `{boolean}` default: `false`
  - immediate `{boolean}` default: `false`

## Usage

### Create singleton

```javascript
const getNumber = useSingleton(() => {
  console.log("created");
  return 1;
});

getNumber();
// log -> 'created'
// -> 1

getNumber();
// -> 1
```

### Create singleton immediately

```javascript
const getNumber = useSingleton(
  () => {
    console.log("created");
    return 1;
  },
  {
    immediate: true,
  }
);
// log -> 'init'

getNumber();
// -> 1

getNumber();
// -> 1
```

### Create singleton with key, and recreate by different key

```javascript
const getTime = useSingleton(
  (key) => {
    console.log(key);
    return new Date();
  },
  {
    withKey: true,
  }
);

const instance0 = getTime();
// log -> undefined
// -> date
const instance1 = getTime();
// -> same as instance0

const instance2 = getTime(1);
// log -> 1
// -> new date
const instance3 = getTime(1);
// -> same as instance2
const instance4 = getTime();
// -> same as instance2
```

### Create singleton by async function

```javascript
const getUserInfo = useSingleton(
  async (key: userId) => {
    console.log(userId);
    userInfo = await api.get(`https://foo.bar/api/user?id=${userId}`);
    return userInfo;
  },
  {
    withKey: true,
  }
);

await Promise.all[(getUserInfo(1), getUserInfo(1), getUserInfo(2))];
// log -> 1
// log -> 2

// -> [userInfo_1, userInfo_1, userInfo_2]
```
