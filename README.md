# Vue Charts.css - Vue Wrapper for Charts.CSS

<img src="https://vue-charts-css.github.io/docs/assets/img/logo-animation.svg" width="125"/>

Visualization helps end-users understand data. **Vue Charts.css** helps frontend developers turn data into beautiful charts and graphs using the powerful [Charts.CSS framework](https://chartscss.org).

[Get Started | Learn more | Docs](https://vue-charts-css.github.io/docs/get-started/)

![Version](https://badgen.net/npm/v/vue.charts.css) ![Size](https://badgen.net/badgesize/normal/Vue-Charts-CSS/vue.charts.css/main/dist/vue-charts-css.min.js) ![Size GZIP](https://badgen.net/badgesize/gzip/Vue-Charts-CSS/vue.charts.css/main/dist/vue-charts-css.min.js) ![Size Brotli](https://badgen.net/badgesize/brotli/Vue-Charts-CSS/vue.charts.css/main/dist/vue-charts-css.min.js)

## Install

[View Install Guide](https://vue-charts-css.github.io/docs/get-started/installation).

_This is still alpha, please do not use in production. Any issues are still however welcome as this is built out. For more information, [please read the roadmap](https://vue-charts-css.github.io/docs/development/roadmap/)._

### With Package Managers

Yarn
```
yarn add vue.charts.css
```

NPM
```
npm install vue.charts.css
```

## Documentation

[Read Guides & Documentation](https://vue-charts-css.github.io/docs/).

```vue
<charts-css
    heading="Team's Coffee Count"
    type="bar"
    :labels="['Mon', 'Tue', 'Wed']"
    :datasets="datasets"
/>
```

```vue
<script>
    export default {
        data()
        {
            return {
                datasets: [
                    {
                        name: "Ben",
                        values: [2, 4, 3],
                    },
                    {
                        name: "Josie",
                        values: [7, 6, 3, 4],
                    },
                    {
                        name: "Tim",
                        values: [12, 278, 0, 0],
                    },
                ],
            };
        },
    }
</script>
```

## License

**Vue Charts.css** and **Charts.CSS** are licensed under the [MIT license](https://opensource.org/licenses/MIT).

**Vue Charts.css** is not affiliated with the creators of **Charts.css**.
