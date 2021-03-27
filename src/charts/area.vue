<template>
    <tbody>
        <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
        >
            <th scope="row"><slot name="label" v-bind:label="labels[rowIndex]" v-bind:labelIndex="rowIndex"></slot></th>

            <td
                v-for="(value, colIndex) in row"
                :key="colIndex"
                :style="resolveDataStyle(value, rowIndex, colIndex)"
            >
                <span class="data">
                    <slot name="data" :value="value" :formattedValue="formatDataValue(value.valueRaw)">
                        {{ formatDataValue(value.valueRaw) }}
                    </slot>
                </span>
                <span v-if="value.tooltip" class="tooltip">{{ value.tooltip }}</span>
            </td>
        </tr>
    </tbody>
</template>

<script>
    import ChartBaseMixin from "./../mixins/chart-base";

    export default {
        name: "charts-css-area",

        mixins: [ChartBaseMixin,],

        computed: {
            /**
             * Converts from datasets schema to Charts.CSS rendering.
             * @return {array}
             */
            rows()
            {
                /**
                 * get highest value in values, so we can calculate scale between 0.0 and 1.0
                 * @type {Number}
                 */
                const max = Math.max(...this.datasets.reduce((carry, dataset) => {
                    carry = carry.concat(dataset.values);
                    return carry;
                }, []));

                return this.datasets.reduce((carry, dataset, index) => {

                    /**
                     * Map dataset to each column
                     */
                    dataset.values.forEach((value, valueIndex) => {
                        if (typeof carry[valueIndex] === "undefined"){
                            carry[valueIndex] = [];
                        }

                        let tooltip = this.resolveDataTooltip && this.showTooltips ?
                            this.resolveDataTooltip(value, this.labels[valueIndex], dataset.name, valueIndex, valueIndex, this.datasets.length > 1) :
                            null
                        ;

                        carry[valueIndex].push({
                            valueRaw: value,
                            valueIndex: valueIndex,
                            start: value / max,
                            size: dataset.values[valueIndex + 1] ? dataset.values[valueIndex + 1] / max : 0,
                            datasetName: dataset.name,
                            datasetIndex: index,
                            label: this.labels[valueIndex],
                            tooltip: tooltip,
                        });
                    });

                    return carry;
                }, []);
            },
        },
    }
</script>
