import http from '../http'


const increment = ({ commit, state }) => {
    console.log('BEFORE', state.count);
    commit('increment');
    console.log('AFTER', state.count);
};

const decrement = ({ commit }) => {
    commit('decrement');
};

const incrementAsync = ({ commit }) => {
    setTimeout(() => commit('increment'), 1000);
};

const loadList = ({ commit }, payload) => {
    const { api='', cb=null, name='' } = payload || {};
    if (!api || !name) return;
    
    http.get(api).then(res=>{
        let data = [];

        res.data.map(itm=>{
            const {
                _id='', _ref='', created_at=null, email='', firstName='', lastName='',
                status='', type='', updated_at=null, userName=''
            } = itm || {};

            data.push({
                _id, _ref, created_at, email, firstName, lastName,
                status, type, updated_at, userName
            });
        });

        const payload = { data, name };

        commit('setList', payload);
        if (cb) cb(true);
    }).catch(e=>{
        if (cb) cb(e);
    });
};


export default {
    increment,
    decrement,
    incrementAsync,
    loadList
};
