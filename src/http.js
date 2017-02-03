import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'https://api.symple.my/api',
    headers: { 'X-App-Name': 'Vue App' }
});
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
