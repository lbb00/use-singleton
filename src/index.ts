export const useSingleton: UseSingleton = <T>(
  createInstance: CreateInstance<T>, {
    withKey = false
  } = {}
) => {
  const UNDEFINED_INSTANCE = {}
  let _instance: T | Record<any, any> = UNDEFINED_INSTANCE
  let _key: string | undefined

  function checkSameKey (key?: string): boolean {
    if (!withKey || key === undefined || key === _key) {
      return true
    } else {
      return false
    }
  }

  return function getSingleton (key?: string) {
    if (_instance === UNDEFINED_INSTANCE || !checkSameKey(key)) {
      _key = key
      _instance = createInstance(_key)
    }

    return _instance as T
  }
}

export default useSingleton
