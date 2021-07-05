declare interface CreateInstance<T> {
	(key?: string): T
}
declare type UseSingletonOptions = {
	withKey?: boolean
}

declare interface UseSingleton {
	<T>(createInstance: CreateInstance<T>, options?: UseSingletonOptions): (key?: string) => T
}

declare module 'use-singleton' {

	export const useSingleton: UseSingleton

	export default useSingleton
}
