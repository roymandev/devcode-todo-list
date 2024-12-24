export const promiseHandler = <T, E = Error>(promise: () => T | Promise<T>) =>
  Promise.resolve(promise())
    .then((res) => [res, null] as [T, null])
    .catch((err) => [null, err] as [null, E]);
