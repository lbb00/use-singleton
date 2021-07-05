import { useSingleton } from '../src/index'

it('test sync singleton without key', async () => {
  let count = 0
  const getSingleton = useSingleton<number>(() => {
    count = count + 1
    return count
  })

  const [a, b, c] = [getSingleton(), getSingleton(), getSingleton('1')]

  expect(a).toBe(1)
  expect(b).toBe(1)
  expect(c).toBe(1)
})

it('test sync singleton with key', async () => {
  let count = 0
  const getSingleton = useSingleton<number>(() => {
    count = count + 1
    return count
  }, {
    withKey: true
  })
  const a = getSingleton()
  const b = getSingleton('1')
  const b1 = getSingleton()
  const b2 = getSingleton('1')
  const b3 = getSingleton()

  const [c, d] = [getSingleton('2'), getSingleton('3')]

  expect(a).toBe(1)
  expect(b).toBe(2)
  expect(b1).toBe(2)
  expect(b2).toBe(2)
  expect(b3).toBe(2)
  expect(c).toBe(3)
  expect(d).toBe(4)
})

it('test async singleton without key', async () => {
  let count = 0
  const getAsyncSingleton = useSingleton<Promise<number>>(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        count = count + 1
        resolve(count)
      }, 200)
    })
  })

  const [a, b, c] = await Promise.all([getAsyncSingleton('1'), getAsyncSingleton('2'), getAsyncSingleton('3')])

  expect(a).toBe(1)
  expect(b).toBe(1)
  expect(c).toBe(1)
})

it('test async singleton with key', async () => {
  let count = 0
  const getAsyncSingleton = useSingleton<Promise<number>>(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        count = count + 1
        resolve(count)
      }, 200)
    })
  }, {
    withKey: true
  })
  const a = await getAsyncSingleton('1')
  const a1 = await getAsyncSingleton('1')
  const a2 = await getAsyncSingleton()

  const [b, c] = await Promise.all([getAsyncSingleton('2'), getAsyncSingleton('3')])

  expect(a).toBe(1)
  expect(a1).toBe(1)
  expect(a2).toBe(1)
  expect(b).toBe(2)
  expect(c).toBe(3)
})
