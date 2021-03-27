<template>
    <div>
        <h1><a target="_blank" href="https://vue-charts-css.github.io/docs/">Vue Charts.CSS</a> Examples</h1>

        <i>TODO:<br>better styling. Waiting for Charts.CSS <a target="_blank" href="https://github.com/ChartsCSS/charts.css/issues/15">namespacing update</a>, so there aren't conflicts between Charts.CSS and styling frameworks (like tailwindcss)</i>
        <br><br><br>

        <div>
            <div>
                <input :id="_uid + 'showHeading'" type="checkbox" v-model="showHeading" />
                <label :for="_uid + 'showHeading'">show-heading</label>
            </div>
            <div>
                <input :id="_uid + 'showLegend'" type="checkbox" v-model="showLegend" />
                <label :for="_uid + 'showLegend'">show-legend</label>
            </div>
            <div>
                <input :id="_uid + 'showLabels'" type="checkbox" v-model="showLabels" />
                <label :for="_uid + 'showLabels'">show-labels</label>
            </div>
            <div>
                <input :id="_uid + 'showTooltips'" type="checkbox" v-model="showTooltips" />
                <label :for="_uid + 'showTooltips'">show-tooltips</label>
            </div>
            <div>
                <input :id="_uid + 'reverse'" type="checkbox" v-model="reverse" />
                <label :for="_uid + 'reverse'">reverse</label>
            </div>
            <div>
                <label :for="_uid + 'dataSpacing'">data-spacing</label>
                <input :id="_uid + 'dataSpacing'" type="number" min="0" max="20" v-model="dataSpacing" />
            </div>
            <div>
                <label :for="_uid + 'heading'">heading</label>
                <input :id="_uid + 'heading'" type="text" v-model="heading" />
            </div>
        </div>

        <div>
            <button @click="addDataset">Add Dataset</button>
            <button @click="removeDataset">Remove Dataset</button>
            <button @click="randomizeDatasets">Randomize Datasets</button>
        </div>

        <h2 style="margin: 2rem 0 0.25rem 0;">{{ type }} Chart</h2>

        <div>
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

        methods: {
            updateLabel(labelIndex, newValue)
            {
                let labels = this.labels;
                labels[labelIndex] = newValue;
                this.labels = labels;
            },
            updateDatasetValue(datasetIndex, valueIndex, newValue)
            {
                let dataset = this.datasets[datasetIndex];
                dataset.values[valueIndex] = newValue;
                this.$set(this.datasets, datasetIndex, dataset);
            },
            addDataset()
            {
                this.datasets.push({
                    name: this.generateName(),
                    values: [this.generateNumber(), this.generateNumber(), this.generateNumber(),],
                });
            },
            removeDataset()
            {
                this.datasets = this.datasets.slice(1);
            },
            randomizeDatasets()
            {
                for (var datasetIndex = 0; datasetIndex < this.datasets.length; datasetIndex++){
                    let dataset = this.datasets[datasetIndex];
                    dataset.values = dataset.values.map(value => this.generateNumber());
                    this.$set(this.datasets, datasetIndex, dataset);
                }
            },
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
