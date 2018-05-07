export default class AsyncAction {
  constructor(type, requestStatusKey, isRequesting, didInvalidate, data = {}) {
    return {
      type,
      requestStatusKey,
      [requestStatusKey]: {
        isRequesting,
        didInvalidate
      },
      ...data
    };
  }
}