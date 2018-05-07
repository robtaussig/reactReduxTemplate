export default class SyncAction {
  constructor(type, data = {}) {
    return {
      type,
      ...data
    };
  }
}