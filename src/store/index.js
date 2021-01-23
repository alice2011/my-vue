import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./moudle/app"
import login from "./moudle/login"

export default new Vuex.Store({
  modules:{
    app,
    login
  }
});
