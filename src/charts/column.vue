<template>
    <table
        :class="chartClasses"
        :style="{'height': heightStyle,}"
    >
        <caption v-if="hasHeading" class="heading">
            <slot name="heading"></slot>
        </caption>
        <tbody>
            <tr
                v-for="(row, rowIndex) in rows"
                :key="rowIndex + '-' + row.length"
            >
                <th scope="row">{{ labels[rowIndex] }}</th>

                <td
                    v-for="(value, colIndex) in row"
                    :key="colIndex + '-' + row.length"
                    :style="resolveDataStyle(value, rowIndex, colIndex)"
                >
                    <span class="data">
                        {{ formatDataValue(value.valueRaw) }}
                    </span>
                    <span v-if="value.tooltip" class="tooltip">
                        {{ value.tooltip }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import ChartBaseMixin from "./../mixins/chart-base";

    export default {
        name: "charts-css-column",

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
                            size: value / max,
                            datasetName: dataset.name,
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
