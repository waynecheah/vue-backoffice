import http from '../../http'


const state = {
    _id: '',
    data: {},
    token: '',
    type: ''
};

const getters = {
    getAccessToken: state => state.token,

    getLocalPayload () {
        const json = localStorage.getItem('user/payload');
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
        console.log('[DISPATCHED] user/test');
        setTimeout(()=>{
            console.log('[ACTION] user/test -', payload);
        }, 800);
    }
};

const mutations = {
    login (state, payload) {
        const { accessToken='', type='', user_id='' } = payload || {};
        state._id   = user_id;
        state.data  = payload;
        state.token = accessToken;
        state.type  = type;
    },

    logout (state) {
        console.log('[MUTATION] user/logout');
        localStorage.removeItem('user/payload');
        state._id   = '';
        state.data  = {};
        state.token = '';
        state.type  = '';
    },

    setLocalPayload (state, payload) {
        localStorage.setItem('user/payload', JSON.stringify(payload));
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
