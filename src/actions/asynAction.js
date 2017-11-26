export default class AsyncAction {
  constructor(type, requestStatusKey, isRequesting, didInvalidate, keyValues = {}) {
    return {
      type,
      requestStatusKey,
      [requestStatusKey]: {
        isRequesting,
        didInvalidate
      },
      ...keyValues
    };
  }
}