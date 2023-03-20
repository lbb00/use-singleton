type useSingleSetter<T> = (newValue: T | ((oldValue: T) => T)) => T;
type useSingletonGetter<T> = () => T;

export const useSingle = function <T>(
  initialValue: T | (() => T)
): [useSingletonGetter<T>, useSingleSetter<T>] {
  let value: T =
    typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;

  function getter() {
    return value;
  }

  const setter: useSingleSetter<T> = (newValue) => {
    value =
      typeof newValue === "function"
        ? (newValue as (oldValue?: T) => T)(value)
        : newValue;

    return value;
  };

  return [getter, setter];
};

export const useSingleton = function <T, K = any>(
  createInstance: (key?: K, oldInstance?: T) => T,
  { withKey = false, immediate = false, keyCache = false } = {}
) {
  // maybe the undefined is the value of the instance
  const UNDEFINED_INSTANCE = {};
  let _key: K | undefined = undefined;
  const cache = new Map<K | undefined, T>();
  const [getSingle, setSingle] = useSingle<T | {}>(UNDEFINED_INSTANCE);

  function getRealSingle() {
    const single = getSingle();
    return single === UNDEFINED_INSTANCE ? undefined : (single as T);
  }

  function create(key?: K) {
    const instance = withKey
      ? createInstance(key, getRealSingle())
      : createInstance(void 0, getRealSingle());
    if (keyCache) {
      cache.set(key, instance);
    }
    return instance;
  }

  function getInstance(key?: K, { refresh = false, clean = false } = {}) {
    const currentSingle = getSingle();
    const keyMatch = withKey && key !== _key;
    if (keyMatch || refresh || currentSingle === UNDEFINED_INSTANCE) {
      _key = key;
      if (!refresh && keyMatch && keyCache && cache.has(_key)) {
        setSingle(cache.get(_key) as T);
        if (clean) {
          cache.delete(_key);
        }
      } else {
        setSingle(create(_key));
      }
    }
    if (clean) {
      const single = getRealSingle();
      setSingle(UNDEFINED_INSTANCE);
      return single;
    }
    return getRealSingle();
  }

  immediate && getInstance();

  return getInstance;
};

export default useSingleton;
