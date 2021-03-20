import Vue from "vue/dist/vue.esm.js";
import VueChartCss from "./../../src/index";
import App from "./app";

Vue.use(VueChartCss);

const app = new Vue({
    el: "#app",
    components: {
        App,
    },
    template: "<App/>",
});
