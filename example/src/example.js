import { createApp } from "vue";

import VueChartCss from "./../../src/index";
import App from "./app";

const app = createApp(App)
    .use(VueChartCss)
    .mount("#app")
;
