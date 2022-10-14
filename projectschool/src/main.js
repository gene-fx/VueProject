import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Toasted, {
  position: 'top-center',
  duration: 3000,
});

new Vue({
  render: h => h(App),
}).$mount('#app')
