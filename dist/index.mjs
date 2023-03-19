const useSingle = function(initialValue) {
  let value = typeof initialValue === "function" ? initialValue() : initialValue;
  function getter() {
    return value;
  }
  const setter = (newValue) => {
    value = typeof newValue === "function" ? newValue(value) : newValue;
  };
  return [getter, setter];
};
const useSingleton = function(createInstance, { withKey = false, immediate = false, keyCache = false } = {}) {
  const UNDEFINED_INSTANCE = {};
  let _key = void 0;
  const cache = /* @__PURE__ */ new Map();
  const [getSingle, setSingle] = useSingle(UNDEFINED_INSTANCE);
  function getRealSingle() {
    return getSingle() === UNDEFINED_INSTANCE ? void 0 : getSingle();
  }
  function create(key) {
    const instance = withKey ? createInstance(key, getRealSingle()) : createInstance(void 0, getRealSingle());
    if (keyCache) {
      cache.set(key, instance);
    }
    return instance;
  }
  function getInstance(key, { refresh = false } = {}) {
    const currentSingle = getSingle();
    const keyMatch = withKey && key !== _key;
    if (keyMatch || refresh || currentSingle === UNDEFINED_INSTANCE) {
      _key = key;
      if (!refresh && keyMatch && keyCache && cache.has(_key)) {
        setSingle(cache.get(_key));
      } else {
        setSingle(create(_key));
      }
    }
    return getRealSingle();
  }
  immediate && getInstance();
  return getInstance;
};
export {
  useSingleton as default,
  useSingle,
  useSingleton
};
