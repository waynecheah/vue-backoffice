const increment = state => {
    state.count++;
};

const decrement = state => {
    state.count--;
};

const setList = (state, payload) => {
    const { data=null, name='' } = payload || {};
    if (!name) return;

    if (!state.colletions[name]) state.colletions[name] = {};
    state.colletions[name].list = data;
};


export default {
    decrement,
    increment,
    setList
};
