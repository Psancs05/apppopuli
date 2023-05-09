import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import i18n from "./i18n";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // use the language from the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = "es";
  }

  // set the current language for i18n.
  i18n.locale = language;
  next();
});

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
