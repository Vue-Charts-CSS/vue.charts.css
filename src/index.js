import Chart from "./chart.vue";
import ChartBar from "./charts/bar.vue";
import ChartColumn from "./charts/column.vue";

export default {
    install(Vue, options)
    {

        options = Object.assign({}, {

        }, options);

        Vue.component("chartscss", Chart);
        Vue.component("chartscss-bar", ChartBar);
        Vue.component("chartscss-column", ChartColumn);
    }
}
