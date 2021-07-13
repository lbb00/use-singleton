# use-singleton

> Create the singleton better, and more easily.

[![Npm](https://badgen.net/npm/v/use-singleton)](https://www.npmjs.com/package/use-singleton)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/use-singleton)](https://bundlephobia.com/result?p=use-singleton)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/use-singleton.svg)](https://codecov.io/gh/lbb00/use-singleton)
[![License](https://img.shields.io/github/license/lbb00/use-singleton.svg)](https://github.com/lbb00/use-singleton/blob/master/LICENSE)
[![License](https://img.shields.io/npm/dt/use-singleton.svg)](https://www.npmjs.com/package/use-singleton)

- No dependency
- No `Class`
- Supports typescript
- Supports refresh singleton
- Supports create singleton immediately
- ~1kb before gzipped

## Install

### npm

```bash
npm install use-singleton --save
```

## Usage

### Base

```javascript
const getSingleton = useSingleton(createInstance, options);
```

- createInstance {function}
- options {Object} default: `{}`
  - withKey {boolean} default: `false`
  - immediate {boolean} default: `false`

### Example: Create a singleton

```javascript
import useSingleton from "use-singleton";

function init() {
  console.log("init");
}

const getInstance = useSingleton(() => {
  const instance = init();
  return instance;
});

const instance = getInstance();
// -> 'init'
// -> 1
```

### Example: Create a singleton with immediate

```javascript
import useSingleton from "@use-singleton";

function init() {
  console.log("init");
  return 1;
}

const getInstance = useSingleton(
  () => {
    const instance = init();
    return instance;
  },
  {
    immediate: true,
  }
);
// -> 'init'

const instance = getInstance(); // -> 1
```

### Example: Create a singleton with key

```javascript
import useSingleton from "use-singleton";

function init() {
  return new Date();
}
const getInstance = useSingleton(
  (key) => {
    const instance = init();
    return instance;
  },
  {
    withKey: true,
  }
);

const instance0 = getInstance(); // -> Tue Jul 06 2021 01:15:04 GMT+0800 (中国标准时间)
const instance1 = getInstance(); // -> same time as instance0

const instance2 = getInstance(1); // -> new time
const instance3 = getInstance(1); // same time as instance2
```

### Example: Create a singleton with key by the async function

```javascript
const getUserInfo = useSingleton(
  async (key) => {
    const userInfo = await fetchUserInfo();
    return userInfo;
  },
  {
    withKey: true,
  }
);

if (isLogin) {
  const userInfo = await getChannel();
} else if (isSwitchAccount) {
  // should refresh user info
  // use a new timestamps as the key
  const useInfo = await getChannel(new Date().valueOf());
}
```
