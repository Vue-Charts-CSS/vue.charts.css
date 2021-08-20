# Vue Charts.CSS

<img src="https://vue-charts-css.github.io/docs/assets/img/logo-animation.svg" width="125"/>

Visualization helps end-users understand data. **Vue Charts.CSS** helps frontend developers turn data into beautiful *interactive* charts and graphs using the powerful [Charts.CSS framework](https://chartscss.org).

![Version](https://badgen.net/npm/v/vue.charts.css) ![Size](https://badgen.net/badgesize/normal/Vue-Charts-CSS/vue.charts.css/main/dist/vue-charts-css.min.js) ![Size GZIP](https://badgen.net/badgesize/gzip/Vue-Charts-CSS/vue.charts.css/main/dist/vue-charts-css.min.js) ![Size Brotli](https://badgen.net/badgesize/brotli/Vue-Charts-CSS/vue.charts.css/main/dist/vue-charts-css.min.js)

[Get Started | Learn more | Docs](https://vue-charts-css.github.io/docs/get-started/)

## Install

[View Install Guide](https://vue-charts-css.github.io/docs/get-started/installation).

### With Package Managers

NPM
```
npm install vue.charts.css
```

Yarn
```
yarn add vue.charts.css
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

**Vue Charts.CSS** and **Charts.CSS** are licensed under the [MIT license](https://opensource.org/licenses/MIT).

**Vue Charts.CSS** is not affiliated with the creators of **Charts.CSS**.
