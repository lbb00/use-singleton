import { test, expect } from "vitest"
import { useSingleton, useSingle } from "../src/index"

test("useSingle", async () => {
  const [getVal, setVal] = useSingle(1)
  expect(getVal()).toBe(1)
  expect(getVal()).toBe(1)
  setVal(2)
  expect(getVal()).toBe(2)
  expect(getVal()).toBe(2)
})

test("useSingle: test create value by function", async () => {
  const [getVal, setVal] = useSingle(() => 1)
  expect(getVal()).toBe(1)
  setVal((oVal) => oVal + 1)
  expect(getVal()).toBe(2)
  expect(getVal()).toBe(2)
})

test("useSingleton", async () => {
  let hasInit = false
  let count = 0
  const getSingleton = useSingleton<number>(() => {
    hasInit = true
    count = count + 1
    return count
  })

  expect(hasInit).toBe(false)

  const [a, b, c] = [getSingleton(), getSingleton(), getSingleton(1)]

  expect(a).toBe(1)
  expect(b).toBe(1)
  expect(c).toBe(1)
})

test("useSingleton: test create singleton immediately", async () => {
  let hasInit = false
  const getSingleton = useSingleton<number>(
    () => {
      hasInit = true
      return 1
    },
    {
      immediate: true,
    }
  )
  expect(hasInit).toBe(true)
  expect(getSingleton()).toBe(1)
})

test("useSingleton: test refresh", async () => {
  let count = 0
  const getSingleton = useSingleton<number>(() => {
    count = count + 1
    return count
  })

  expect(getSingleton()).toBe(1)
  expect(getSingleton(undefined, { refresh: true })).toBe(2)
})

test("useSingleton: test create singleton with key", async () => {
  const getSingleton = useSingleton<number>(
    (key) => {
      return key
    },
    {
      withKey: true,
    }
  )

  expect(getSingleton()).toBe(undefined)
  expect(getSingleton(1)).toBe(1)
  expect(getSingleton(2)).toBe(2)
  expect(getSingleton()).toBe(undefined)
})

test("useSingleton: test create singleton with async function", async () => {
  let fetchCount = 0
  const getAsyncSingleton = useSingleton<Promise<number>>(() => {
    return new Promise((resolve) => {
      fetchCount = fetchCount + 1
      setTimeout(() => {
        resolve(fetchCount)
      }, 200)
    })
  })

  expect(await getAsyncSingleton()).toBe(1)
  expect(await getAsyncSingleton()).toBe(1)
})

test("test create singleton with key and cache", async () => {
  let fetchCount = 0
  const getAsyncSingleton = useSingleton<Promise<number>>(
    () => {
      return new Promise((resolve) => {
        fetchCount = fetchCount + 1
        setTimeout(() => {
          resolve(fetchCount)
        }, 200)
      })
    },
    {
      withKey: true,
      keyCache: true,
    }
  )
  expect(await getAsyncSingleton(1)).toBe(1)
  expect(await getAsyncSingleton(2)).toBe(2)
  expect(await getAsyncSingleton(1)).toBe(1)
  expect(await getAsyncSingleton(1, { refresh: true })).toBe(3)
})
