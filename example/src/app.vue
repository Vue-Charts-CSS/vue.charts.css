<template>
    <div>
        <h1>Chart Examples</h1>

        <button @click="addDataset">Add Dataset</button>
        <button @click="removeDataset">Remove Dataset</button>

        <h2>Column</h2>
        <charts-css
             type="column"
             heading="Team's coffee count"
             :labels="labels"
             :datasets="datasets"
             :height="300"
             :data-spacing="20"
             :formatDataValue="(value) => value + ' coffee' + ( value > 1 ? 's':'' )"
             show-heading
             show-legend
             show-data-axis
             show-labels
             show-tooltips
         />

         <h2>Bar</h2>
         <charts-css
              v-if="datasets.length"
              type="bar"
              :heading="datasets[0].name + '\'s coffee count'"
              :labels="labels"
              :datasets="[ datasets[0], ]"
              :height="300"
              :data-spacing="20"
              :formatDataValue="(value) => value + ' coffee' + ( value > 1 ? 's':'' )"
              :resolveDataColor="(value, rowIndex, colIndex) => rowIndex == 1 ? 'green':null"
              color="rgba(255,180,50,0.75)"
              show-heading
              show-legend
              show-data-axis
              show-labels
              show-tooltips
          />

          <h2>Area</h2>
          <charts-css
               type="area"
               heading="Team's coffee count"
               :labels="labels"
               :datasets="datasets"
               :height="300"
               :formatDataValue="(value) => value + ' coffee' + ( value > 1 ? 's':'' )"
               :resolveDataColor="(value, rowIndex, colIndex) => rowIndex == 1 ? 'green':null"
               show-heading
               show-legend
               show-labels
               hide-data
           />

           <h2>Line</h2>
           <charts-css
                type="line"
                heading="Team's coffee count"
                :labels="labels"
                :datasets="datasets"
                :height="300"
                :formatDataValue="(value) => value + ' coffee' + ( value > 1 ? 's':'' )"
                :resolveDataColor="(value, rowIndex, colIndex) => rowIndex == 1 ? 'green':null"
                show-heading
                show-legend
                show-labels
                hide-data
            />
    </div>
</template>

<script>
    export default {
        name: "app",

        data()
        {
            return {
                labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun",],
                datasets: [
                    {
                        name: "James",
                        values: [3, 20, 32, 4],
                    },
                    {
                        name: "Ben",
                        values: [6, 3, 4, 17],
                    },
                    {
                        name: "Tim",
                        values: [4, 13, 14, 6],
                    },
                ],
            };
        },

        methods: {
            addDataset()
            {
                this.datasets.push({
                    name: this.generateName(),
                    values: [this.generateNumber(), this.generateNumber(), this.generateNumber(), this.generateNumber(),],
                });
            },
            removeDataset()
            {
                this.datasets = this.datasets.slice(1);
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
                return Math.round(Math.random() * 100);
            },

            animate()
            {
                this.removeDataset();
                this.addDataset();
                setTimeout(this.animate, 2000);
            }
        },

        mounted()
        {
            this.animate();
        }
    }
</script>
