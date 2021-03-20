<template>
    <div>
        <h1>Example</h1>
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
                        values: [1, 20, 32, 1],
                    },
                    {
                        name: "Ben",
                        values: [6, 3, 4, 1],
                    },
                ],
            };
        },
    }
</script>
