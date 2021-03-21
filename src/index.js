import Chart from "./chart.vue";

export default {
    install(Vue, options)
    {
        options = Object.assign({}, {

        }, options);

        Vue.component("charts-css", Chart);
    }
}
