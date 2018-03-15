import Vue from "vue"
import App from "./App.vue"
import "./css/reset.scss"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: "#app",
    components: { App },
    template: "<App/>",
})
/* eslint-enable */
