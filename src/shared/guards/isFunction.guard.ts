// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction: (x: unknown) => x is Function = (x) =>
  typeof x === 'function'
