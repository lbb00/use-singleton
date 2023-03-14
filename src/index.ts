type useSingleSetter<T> = (newValue: T | ((oldValue: T) => T)) => void;
type useSingletonGetter<T> = () => T;

export const useSingle = function <T>(
  initialValue: T | (() => T)
): [useSingletonGetter<T>, useSingleSetter<T>] {
  let value: T =
    typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue

  function getter() {
    return value
  }

  const setter: useSingleSetter<T> = (newValue) => {
    value =
      typeof newValue === "function"
        ? (newValue as (oldValue?: T) => T)(value)
        : newValue
  }

  return [getter, setter]
}

export const useSingleton = function <T, K = any>(
  createInstance: (key?: K, oldInstance?: T) => T,
  { withKey = false, immediate = false, cache = false } = {}
) {
  // maybe the undefined is the value of the instance
  const UNDEFINED_INSTANCE = {}
  let _key: K | undefined = undefined
  const _cache = new Map<K | undefined, T>()
  const [getSingle, setSingle] = useSingle<T | {}>(UNDEFINED_INSTANCE)

  function getRealSingle() {
    return getSingle() === UNDEFINED_INSTANCE ? undefined : (getSingle() as T)
  }

  function create(key?: K) {
    const instance = withKey
      ? createInstance(key, getRealSingle())
      : createInstance(void 0, getRealSingle())
    if (cache) {
      _cache.set(key, instance)
    }
    return instance
  }

  function getInstance(key?: K, { refresh = false } = {}) {
    const currentSingle = getSingle()
    const keyMatch = withKey && key !== _key
    if (keyMatch || refresh || currentSingle === UNDEFINED_INSTANCE) {
      _key = key

      if (!refresh && keyMatch && cache && _cache.has(_key)) {
        setSingle(_cache.get(_key) as T)
      } else {
        setSingle(create(_key))
      }
    }
    return getRealSingle()
  }

  immediate && getInstance()

  return getInstance
}

export default useSingleton
