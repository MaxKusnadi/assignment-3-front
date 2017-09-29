import 'whatwg-fetch'
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import FBSignInButton from 'vue-facebook-signin-button'
import VueGeolocation from 'vue-browser-geolocation'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import 'vue-awesome/icons/facebook'
import 'vue-awesome/icons/google-plus'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/check'
import Icon from 'vue-awesome/components/Icon'

Vue.use(Vuetify)
Vue.use(FBSignInButton)
import('vue-analytics').then(VueAnalytics =>
  Vue.use(VueAnalytics, {
    id: 'UA-107183657-1',
    router,
  })
)

import('vue2-google-maps').then(VueGoogleMaps =>
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
      libraries: 'places',
    },
  })
)
Vue.use(VueGeolocation)

Vue.use(Icon)
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
})

// Load Facebook SDK
window.fbAsyncInit = function() {
  FB.init({
    appId: '1935737966751741',
    xfbml: true,
    version: 'v2.10',
  })

  FB.getLoginStatus(res => {
    if (res.status === 'connected') {
      store.dispatch('login', { accessToken: res.authResponse.accessToken })
    }
  })

  FB.AppEvents.logPageView()
}

/* eslint-disable */
/* prettier-ignore */
;(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
