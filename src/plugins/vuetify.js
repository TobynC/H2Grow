import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import {Laue} from 'laue'

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#3fb1e3"
  }
});

Vue.use(Laue)