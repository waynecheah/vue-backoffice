import axios from 'axios'
import Vue from 'vue'

const auth    = localStorage.getItem(`user/payload`);
const baseURL = 'https://api.symple.my/api';
let headers = { 'X-App-Name': 'Vue App' };

if (auth) {
    const { accessToken='' } = JSON.parse(auth) || {};
    if (accessToken) headers.Authorization = accessToken;
}

const http = axios.create({ baseURL, headers });
Vue.prototype.$http = http;

http.interceptors.response.use(response => {
    return response;
}, error => {
    const { message='', response=null } = error || {};
    const { data=null, status=null } = response || {};
    const errorMessage = data.message || message;

    console.warn(`[ ERROR ${status} ]`, errorMessage);
    return Promise.reject(error);
});


export default http;
