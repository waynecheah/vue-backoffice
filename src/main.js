// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuetify from 'vuetify'

import App from './App'
import router from './app.routes'
import store from './store'

//Vue.use(VueMaterial);
Vue.use(VueMaterial.MdCore);
Vue.use(VueMaterial.MdSnackbar);
Vue.use(Vuetify);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    router,
    store,
    template: '<App/>'
});
