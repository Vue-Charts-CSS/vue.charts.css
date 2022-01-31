<template>
    <div>
        <h1>
            <a target="_blank" href="https://vue-charts-css.github.io/docs/">Vue Charts.CSS</a> Playground
        </h1>

        <div class="options">
            <div>
                <input id="showHeading" type="checkbox" v-model="showHeading" />
                <label for="showHeading">show-heading</label>
            </div>
            <div>
                <input id="showLegend" type="checkbox" v-model="showLegend" />
                <label for="showLegend">show-legend</label>
            </div>
            <div>
                <input id="showLabels" type="checkbox" v-model="showLabels" />
                <label for="showLabels">show-labels</label>
            </div>
            <div>
                <input id="showTooltips" type="checkbox" v-model="showTooltips" />
                <label for="showTooltips">show-tooltips</label>
            </div>
            <div>
                <input id="reverse" type="checkbox" v-model="reverse" />
                <label for="reverse">reverse</label>
            </div>
            <div>
                <input id="dataSpacing" type="number" min="0" max="20" v-model="dataSpacing" />
                <label for="dataSpacing">data-spacing</label>
            </div>
            <div>
                <input id="heading" type="text" v-model="heading" />
                <label for="heading">heading</label>
            </div>
        </div>

        <div class="buttons-wrapper">
            <button @click="addDataset">Add Dataset</button>
            <button @click="removeDataset">Remove Dataset</button>
            <button @click="randomizeDatasets">Randomize Datasets</button>
        </div>

        <h2>{{ type }} Chart</h2>

        <div class="buttons-wrapper">
            <button
                v-for="(availableType, index) in types"
                :key="availableType"
                @click="type = availableType"
                :disabled="type === availableType"
            >
                {{ availableType }}
            </button>
        </div>

        <br>

        <charts-css
             :type="type"
             :heading="heading"
             :labels="labels"
             :datasets="datasets"
             :data-spacing="dataSpacing"
             :show-heading="showHeading"
             :show-legend="showLegend"
             :show-labels="showLabels"
             :show-tooltips="showTooltips"
             :reverse="reverse"
         >
            <template v-slot:heading="slotProps">
                <input type="text" :value="slotProps.heading" v-on:input="heading = $event.target.value">
            </template>

            <template v-slot:label="slotProps">
                <input
                    class="label"
                    type="text"
                    :value="slotProps.label"
                    v-on:input="updateLabel(slotProps.labelIndex, $event.target.value)"
                    :style="{width: `${slotProps.label.length + 6}ch`}"
                >
            </template>

            <template v-slot:data="slotProps">
                <input
                    class="data-number"
                    type="number"
                    :value="slotProps.value.valueRaw"
                    v-on:input="updateDatasetValue(slotProps.value.datasetIndex, slotProps.value.valueIndex, $event.target.value)"
                    min="1"
                >
            </template>
         </charts-css>

        <div style="width: 100%; display: flex;">
            <textarea
                :value="stringifiedDatasetsAndLabels"
                :rows="stringifiedDatasetsAndLabels.split('\n').length"
                readonly
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "app",

        data()
        {
            return {
                types: ['column', 'bar', 'line', 'area',],

                type: "column",
                heading: "Team's coffee count",
                dataSpacing: 20,

                showHeading: true,
                showLegend: true,
                showLabels: true,
                showTooltips: false,
                reverse: false,

                labels: ["Mon", "Tue", "Wed",],
                datasets: [],
            };
        },

        computed: {
            /**
             * Used to demonstrate a JSON stringified version of the datasets and labels.
             * @return {string}
             */
            stringifiedDatasetsAndLabels()
            {
                const value = {
                    datasets: this.datasets,
                    labels: this.labels,
                };
                return JSON.stringify(value, null, 4);
            },
        },

        methods: {
            /**
             * Allow the user to update the label at the given index.
             * @param labelIndex
             * @param newValue
             */
            updateLabel(labelIndex, newValue)
            {
                this.labels[labelIndex] = newValue;
            },

            /**
             * Allow the user to update the dataset value at the given index.
             * @param datasetIndex
             * @param valueIndex
             * @param newValue
             */
            updateDatasetValue(datasetIndex, valueIndex, newValue)
            {
                let dataset = this.datasets[datasetIndex];
                dataset.values[valueIndex] = newValue;
                this.datasets[datasetIndex] = dataset;
            },

            /**
             * Add a new generated dataset to the chart.
             */
            addDataset()
            {
                this.datasets.push({
                    name: this.generateName(),
                    values: [this.generateNumber(), this.generateNumber(), this.generateNumber(),],
                });
            },

            /**
             * Remove a dataset from the chart.
             */
            removeDataset()
            {
                this.datasets = this.datasets.slice(1);
            },

            /**
             * Randomizes the values of every dataset.
             */
            randomizeDatasets()
            {
                for (let datasetIndex = 0; datasetIndex < this.datasets.length; datasetIndex++){
                    let dataset = this.datasets[datasetIndex];
                    dataset.values = dataset.values.map(value => this.generateNumber());
                    this.datasets[datasetIndex] = dataset;
                }
            },

            /**
             * Returns a random human name
             * @return {string}
             */
            generateName()
            {
                const randomNames = [
                    "Genaro",
                    "Zandra",
                    "Nancey",
                    "Jeannette",
                    "Michel",
                    "Kacey",
                    "Essie",
                    "Kristi",
                    "Manuel",
                    "Cherrie",
                    "Dollie",
                    "Jordon",
                    "Cathie",
                    "Latoyia",
                    "Herlinda",
                ];
                return randomNames[Math.floor(Math.random() * randomNames.length)];
            },

            /**
             * Returns a random number between 1 and 100.
             * @return {number}
             */
            generateNumber()
            {
                return Math.max(1, Math.round(Math.random() * 100));
            },
        },

        mounted()
        {
            this.addDataset();
            this.addDataset();
            this.addDataset();
        },
    }
</script>
