export const useSingleton: UseSingleton = function <T>(
  createInstance: CreateInstance<T>, {
    withKey = false, immediate = false
  } = {}
) {
  const UNDEFINED_INSTANCE = {}
  let _instance: T | Record<string, undefined> = UNDEFINED_INSTANCE
  let _key: string | undefined

  function checkSameKey(key?: string): boolean {
    if (!withKey || key === undefined || key === _key) {
      return true
    } else {
      return false
    }
  }

  function getSingleton(key?: string) {
    if (_instance === UNDEFINED_INSTANCE || !checkSameKey(key)) {
      _key = key
      _instance = createInstance(_key)
    }

    return _instance as T
  }

  immediate && getSingleton()

  return getSingleton
}

export default useSingleton
