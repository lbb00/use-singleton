# use-singleton

[![Npm](https://badgen.net/npm/v/use-singleton)](https://www.npmjs.com/package/use-singleton)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/use-singleton)](https://bundlephobia.com/result?p=use-singleton)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/use-singleton.svg)](https://codecov.io/gh/lbb00/use-singleton)
[![License](https://img.shields.io/github/license/lbb00/use-singleton.svg)](https://github.com/lbb00/use-singleton/blob/master/LICENSE)

- No dependency
- Functional
- Supports typescript
- Supports refresh singleton
- ~1kb before gzipped

## Install

### npm

```bash
npm install use-singleton --save
```

### browser

```html
<script src="use-singleton.min.js"></script>
```

## Usage

Base.

```javascript
const getSingleton = useSingleton(createInstance, Options);
```

Example: create a singleton.

```javascript
import useSingleton from "@use-singleton";

const getInstance = useSingleton(() => {
  const instance = init();
  return instance;
});

const instance = getInstance();
```

Example: create a singleton with key.

```javascript
import useSingleton from "@use-singleton";

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
const instance1 = getInstance(); // -> same as instance0

const instance2 = getInstance(1); // -> new date
const instance3 = getInstance(1); // same as instance2
```

Example: create a singleton with key by the async create instance function.

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
  // should refresh use info
  // use a new date as the key
  const useInfo = await getChannel(new Date().valueOf());
}
```
