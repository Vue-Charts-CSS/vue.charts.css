import Chart from "./chart.vue";

const VueChartsCSS = {
    install(Vue, options)
    {
        options = Object.assign({}, {

        }, options);

        Vue.component("charts-css", Chart);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueChartsCSS);
}

export default VueChartsCSS;
