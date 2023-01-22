import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store'

loadFonts()

createApp(App).use(store)
  .use(vuetify)
  .use(VueAxios, axios)
  .use(store)
  .mount('#app')
