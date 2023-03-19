type useSingleSetter<T> = (newValue: T | ((oldValue: T) => T)) => void;
type useSingletonGetter<T> = () => T;
export declare const useSingle: <T>(initialValue: T | (() => T)) => [useSingletonGetter<T>, useSingleSetter<T>];
export declare const useSingleton: <T, K = any>(createInstance: (key?: K | undefined, oldInstance?: T | undefined) => T, { withKey, immediate, keyCache }?: {
    withKey?: boolean | undefined;
    immediate?: boolean | undefined;
    keyCache?: boolean | undefined;
}) => (key?: K | undefined, { refresh }?: {
    refresh?: boolean | undefined;
}) => T | undefined;
export default useSingleton;
