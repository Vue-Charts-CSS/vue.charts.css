<template>
    <div>
        <h1>Chart Examples</h1>

        <h2>Column</h2>
        <chartscss
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
         <chartscss
              type="bar"
              heading="Bens coffee count"
              :labels="labels"
              :datasets="[{values: datasets[1].values }]"
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
                        values: [6, 3, 4, 6],
                    },
                ],
            };
        },
    }
</script>
