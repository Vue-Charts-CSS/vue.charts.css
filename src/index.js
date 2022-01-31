import Chart from "./chart.vue";

const VueChartsCSS = {
    install(Vue, options)
    {
        options = Object.assign({}, {

        }, options);

        Vue.component("charts-css", Chart);
    }
};

export default VueChartsCSS;
