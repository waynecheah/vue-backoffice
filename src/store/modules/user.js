import http from '../../http'


const namespaced = 'user';
const state = {
    _id: '',
    data: {},
    token: '',
    type: ''
};

const getters = {
    getAccessToken: state => state.token,

    getLocalPayload () {
        const json = localStorage.getItem(`${namespaced}/payload`);
        return (json) ? JSON.parse(json) : null;
    },

    getUserId: state => state._id,

    getUserType: state => state.type,

    isAdmin (state, getters) {
        return (getters.getUserType == 'admin');
    }
};

const actions = {
    login ({ commit }, payload) {
        http.post('/auth/local', payload).then(res => {
            commit('login', res.data);
            commit('setLocalPayload', res.data);
        }).catch(e=>{});
    },

    test ({ commit }, payload) {
        console.log(`[DISPATCHED] ${namespaced}/test`);
        setTimeout(()=>{
            console.log(`[ACTION] ${namespaced}/test -`, payload);
        }, 800);
    }
};

const mutations = {
    login (state, payload) {
        console.log(`[MUTATION] ${namespaced}/login`);
        const { accessToken='', type='', user_id='' } = payload || {};

        if (accessToken)
            http.defaults.headers.common.Authorization = accessToken;

        state._id   = user_id;
        state.data  = payload;
        state.token = accessToken;
        state.type  = type;
    },

    logout (state) {
        console.log(`[MUTATION] ${namespaced}/logout`);
        localStorage.removeItem(`${namespaced}/payload`);

        http.defaults.headers.common.Authorization = null;
        delete http.defaults.headers.common.Authorization;

        state._id   = '';
        state.data  = {};
        state.token = '';
        state.type  = '';
    },

    setLocalPayload (state, payload) {
        localStorage.setItem(`${namespaced}/payload`, JSON.stringify(payload));
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
