const allDocuments = state => (name) => {
    return state.collections[name].all;
};

const currentCount = state => {
    return state.count;
};

const doubleCount = (state, getters) => {
    return getters.currentCount * 2;
};

const getList = (state) => (name) => state.colletions[name].list;

export default {
    allDocuments,
    currentCount,
    doubleCount,
    getList
};
