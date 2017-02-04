import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import user from './modules/user'

Vue.use(Vuex);


const state = {
    colletions: {},
    count: 0
};
const modules = {
    user
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules
});

if (module.hot) {
    module.hot.accept([
        // './getters',
        // './actions',
        './mutations',
        './modules/user'
    ], () => {
        store.hotUpdate({
            // getters: require('./getters'),
            // actions: require('./actions'),
            mutations: require('./mutations').default,
            modules: {
                user: require('./modules/user').default
            }
        });
    });
}


export default store
