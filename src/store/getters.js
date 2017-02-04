export const allDocuments = state => (name) => {
    return state.collections[name].all;
};

export const currentCount = state => {
    return state.count;
};

export const doubleCount = (state, getters) => {
    return getters.currentCount * 2;
};
