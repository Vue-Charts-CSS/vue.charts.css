<template>
    <div class="vue-charts-css" :style="style">
        <table
            :class="chartClasses"
        >
            <caption v-if="heading !== null || $slots.heading" class="heading">
                <slot name="heading" :heading="heading">{{ heading }}</slot>
            </caption>

            <tbody>
                <tr
                    v-for="(row, rowIndex) in rows"
                    :key="rowIndex"
                >
                    <th scope="row"><slot name="label" :label="labels[rowIndex]" :labelIndex="rowIndex">{{ labels[rowIndex] }}</slot></th>

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
        </table>

        <slot
            name="legend"
            v-if="( $slots.legend || showLegend ) && this.datasets.length > 0"
            :datasets="datasets"
        >
            <ul :class="legendClasses">
                <li v-for="(dataset, index) in datasets" :key="index + '' + datasets.length">
                    {{ dataset.name }}
                </li>
            </ul>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "charts-css",

        props: {
            type: { type: String, required: true, },
            heading: { type: String },
            headingSize: { type: String, default: "1rem", },
            showHeading: { type: Boolean, default: false, },

            labels: { type: Array, required: true, },
            showLabels: { type: Boolean, default: false, },

            dataSpacing: { type: Number, default: 0, },
            hideData: { type: Boolean, default: false, },
            showDataAxis: { type: Boolean, default: false, },
            showDataOnHover: { type: Boolean, default: false, },

            datasets: { type: Array, required: true, },

            showLegend: { type: Boolean, default: false, },
            legendInline: { type: Boolean, default: true, },
            legendType: { type: String, default: "square", },

            showTooltips: { type: Boolean, default: false, },
            resolveDataTooltip: {
                type: Function,
                default: (value, label, datasetName, rowIndex, colIndex, hasMultipleDatasets = false) => {
                    return ( datasetName && hasMultipleDatasets ? datasetName : label ) + ": " + value;
                },
            },

            reverse: { type: Boolean, default: false, },
            stacked: { type: Boolean, default: false, },

            classes: { type: String, },

            color: { type: String, default: null, },

            formatDataValue: { type: Function, default: (value) => value },
            resolveDataColor: {
                type: Function,
                default: (value, label, datasetName, rowIndex, colIndex, hasMultipleDatasets = false) => null,
            },
        },

        computed: {
            style()
            {
                let style = `--heading-size: ${this.headingSize};`

                if (this.color){
                    style += `--color: ${this.color};`;
                }

                return style;
            },
            legendClasses(){
                if (this.showLegend){
                    return "charts-css legend " + ( this.legendInline ? 'legend-inline':'' ) + " legend-" + this.legendType;
                }
                return "";
            },
            chartClasses()
            {
                let propClasses = {
                    "multiple": this.datasets.length > 1,
                    "reverse": this.reverse,
                    "show-heading": this.showHeading,
                    "hide-data": this.hideData,
                    "show-data-on-hover": this.showDataOnHover,
                    "show-data-axis": this.showDataAxis,
                    "show-labels": this.showLabels,
                    "stacked": this.stacked,
                };

                if (this.dataSpacing){
                    propClasses[ "data-spacing-" + this.dataSpacing ] = true;
                }

                let propClassesString = Object.keys(propClasses).reduce((carry, chartClass) => {
                    if (propClasses[chartClass]){
                        carry += " " + chartClass;
                    }
                    return carry;
                }, "");

                let chartClasses = `charts-css ${this.type} ` + propClassesString + " " + ( this.classes ? this.classes : '' );

                return chartClasses.trim();
            },
            datasetsCount()
            {
                return this.datasets.length;
            },
            hasHeading()
            {
                return !!this.$slots.heading;
            },
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

                const chartType = this.type;

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

                        let mappedValue = {
                            valueRaw: value,
                            valueIndex: valueIndex,
                            datasetName: dataset.name,
                            datasetIndex: index,
                            label: this.labels[valueIndex],
                            tooltip: tooltip,
                        };

                        if (chartType === "column" || chartType == "bar"){
                            mappedValue.size = value / max;
                        }

                        if (chartType == "area" || chartType == "line"){
                            mappedValue.start = value / max;
                            mappedValue.size = dataset.values[valueIndex + 1] ? dataset.values[valueIndex + 1] / max : 0;
                        }

                        carry[valueIndex].push(mappedValue);
                    });

                    return carry;
                }, []);
            },
        },

        methods: {
            resolveDataStyle(value, rowIndex, colIndex)
            {
                let style = {
                    '--start': value.start,
                    '--size': value.size,
                };

                if (this.resolveDataColor){
                    let color = this.resolveDataColor(value, value.label, value.datasetName, rowIndex, colIndex, this.datasetsCount > 1);

                    if (color){
                        style["--color"] = color;
                    }
                }

                return style;
            }
        },
    }
</script>
