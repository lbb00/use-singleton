# use-singleton

[![Npm](https://badgen.net/npm/v/use-singleton)](https://www.npmjs.com/package/use-singleton)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/use-singleton)](https://bundlephobia.com/result?p=use-singleton)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/use-singleton.svg)](https://codecov.io/gh/lbb00/use-singleton)
[![License](https://img.shields.io/github/license/lbb00/use-singleton.svg)](https://github.com/lbb00/use-singleton/blob/master/LICENSE)
[![License](https://img.shields.io/npm/dt/use-singleton.svg)](https://www.npmjs.com/package/use-singleton)

[English](https://github.com/lbb00/use-singleton)

> 更好、更轻松地创建单例。

- 支持 Typescript
- 支持重新创建单例
- 支持立即执行创建单例
- 支持异步创建
- 无依赖
- 非面向对像
- 压缩前不超过 1kb

## 安装

### NPM

```bash
npm install use-singleton --save
```

### 浏览器

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

## 用法

### 创建单例

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

### 创建立即执行单例

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

### 使用 key 创建单例，并通过改变 key 来重新创建单例

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
// -> Tue Jul 06 2021 01:15:04 GMT+0800 (中国标准时间)
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

### 异步创建单例

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
