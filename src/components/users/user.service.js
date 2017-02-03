import http from '../../http';


const login = (payload) => {
    http.post('/auth/local', payload)
    .then(res => {

    })
    .catch(err => {
        console.warn('[ ERROR ]', err);
    });
};


export default {
    login
};
