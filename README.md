# use-singleton

[![Npm](https://badgen.net/npm/v/use-singleton)](https://www.npmjs.com/package/use-singleton)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/use-singleton)](https://bundlephobia.com/result?p=use-singleton)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/use-singleton.svg)](https://codecov.io/gh/lbb00/use-singleton)
[![License](https://img.shields.io/github/license/lbb00/use-singleton.svg)](https://github.com/lbb00/use-singleton/blob/master/LICENSE)
[![License](https://img.shields.io/npm/dt/use-singleton.svg)](https://www.npmjs.com/package/use-singleton)

> Create the powerful singleton easily.

- Lazy or Immediately
- Refresh
- Cache value
- Support cjs, ejs, umd
- Typescript
- Zero dependence
- Side-effect free
- Only ~.5kb after gzipped

## Install

### NPM

```bash
npm install use-singleton --save
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/use-singleton/dist/index.min.js"></script>
<script>
  var useSingle = UseSingleton.useSingle;
  var useSingleton = UseSingleton.useSingleton;
</script>
```

## Usage

```javascript
import { useSingleton, useSingle } from "use-singleton";

// simple
const [getter, setter] = useSingle(initialValue);

// powerful
const getSingleton = useSingleton(createInstance, options);
```

## Example

### useSingle

```javascript
const [getCount, setCount] = useSingle(0);
getCount(); // -> 0
setCount(1);
getCount(1); // -> 1

// vue
const [getCount, setCount] = useSingle(ref(0));
watch(getCount, (val) => console.log(val));

setCount(1);
// log -> 1
getCount().value; // -> 1
```

### useSingleton

#### Lazy

```javascript
const getNumber = useSingleton(() => {
  console.log("created");
  return 1;
});

getNumber();
// log -> 'created'
// -> 1

getNumber(); // -> 1
```

#### Immediately

```javascript
const getNumber = useSingleton(
  () => {
    console.log("created");
    return 1;
  },
  {
    immediately: true,
  }
);
// log -> 'created'

getNumber();
// -> 1
```

#### Async

```javascript
const getServerInfo = useSingleton(
  () => {
    console.log('fetch data')
    return  await api.get(`https://foo.bar/api/server-info`)
  }
);

await getServerKey()
// log -> 'fetch data'
// -> server-info

await getServerKey()
// -> server-info

await getServerKey(null,{ refresh: true})
// log -> 'fetch data'
// -> server-info_new

await getServerKey()
// -> server-info_new
```

#### With key

```javascript
const getUserInfo = useSingleton(
  async (key) => {
    const userId = key;
    console.log(`fetch user info: ${userId}`);
    userInfo = await api.get(`https://foo.bar/api/user?id=${userId}`);
    return userInfo;
  },
  {
    withKey: true,
  }
);

await Promise.all[(getUserInfo(1), getUserInfo(1), getUserInfo(2))];
// log -> 'fetch user info: 1'
// log -> 'fetch user info: 2'
// -> [userInfo_1, userInfo_1, userInfo_2]

await getUserInfo(1);
// log -> 'fetch user info: 1'
// -> userInfo_1
```

#### Cache

> To use the cache, `withKey` must be set to `true`.

```javascript
const getUserInfo = useSingleton(
  async (key) => {
    const userId = key;
    console.log(`fetch user info: ${userId}`);
    userInfo = await api.get(`https://foo.bar/api/user?id=${userId}`);
    return userInfo;
  },
  {
    withKey: true,
    cache: true,
  }
);

await Promise.all[(getUserInfo(1), getUserInfo(1), getUserInfo(2))];
// log -> 'fetch user info: 1'
// log -> 'fetch user info: 2'
// -> [userInfo_1, userInfo_1, userInfo_2]

await getUserInfo(1);
// form cache -> userInfo_1

await getUserInfo(1, { refresh: false });
// log -> 'fetch user info: 1'
// -> userInfo_1
```
