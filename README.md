# Vue Charts.css - Vue Wrapper for Charts.CSS**


Visualization helps end-users understand data. **Vue Charts.css** helps frontend developers turn data into beautiful charts and graphs using the powerful [Charts.CSS framework](https://chartscss.org).

## Documentation

Find full [Documentation for Vue Charts.CSS here](https://vue-charts-css.github.io/docs/).

```
<charts-css
    heading="Team's Coffee Count"
    type="bar"
    :labels="['Mon', 'Tue', 'Wed']"
    :datasets="datasets"
/>
```

```
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
