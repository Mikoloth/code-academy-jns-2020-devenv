const initialState = {
  isLoading: null,
};

export default function (store = initialState, action) {
  switch (action.type) {
    default:
      if (typeof action.type === 'string') {
        if (action.type.endsWith('_PENDING')) {
          const key = action.type.replace('_PENDING', '');
          return {
            ...store,
            isLoading: [...(store.isLoading || []), key],
          };
        } else if (action.type.endsWith('_FULFILLED') || action.type.endsWith('_REJECTED')) {
          const key = action.type.replace('_FULFILLED', '').replace('_REJECTED', '');
          const newIsLoading = (store.isLoading || []).filter(x => x !== key);
          return {
            ...store,
            isLoading: newIsLoading.length > 0 ? newIsLoading : null,
          };
        } else {
          return store;
        }
      } else {
        return store;
      }
  }
}
