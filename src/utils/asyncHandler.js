export function asyncHandler(asyncFunc, { onError, onFinally } = {}) {
  return async (...args) => {
    try {
      await asyncFunc(...args);
    } catch (err) {
      if (onError && onError(err) === true) {
        return;
      }
      throw err;
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
  };
}
