export const increment = ({ commit, state }) => {
    console.log('BEFORE', state.count);
    commit('increment');
    console.log('AFTER', state.count);
};

export const decrement = ({ commit }) => {
    commit('decrement');
};

export const incrementAsync = ({ commit }) => {
    setTimeout(() => commit('increment'), 1000);
};
