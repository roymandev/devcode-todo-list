/**
 * Promise handler for easy error catch
 * @param promise Promise to handle
 * @returns array contain data and error value
 */
export const promiseHanlder = async <T, U = Error>(
  promise: Promise<T>,
): Promise<[T, null] | [null, U]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err as U];
  }
};
