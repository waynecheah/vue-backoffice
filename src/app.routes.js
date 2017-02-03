import Vue from 'vue';
import VueRouter from 'vue-router';

//import SettingRouting from './components/settings/setting.routing';
import UserRouting from './components/users/user.routing';

Vue.use(VueRouter);


export default new VueRouter({
    //mode: 'history',
    routes: [
        ...UserRouting
    ]
});
