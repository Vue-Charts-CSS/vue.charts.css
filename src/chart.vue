<template>
    <div class="vue-charts-css" :style="style">
        <component
            :is="component"
            :height="height"
            :labels="labels"
            :datasets="datasets"
            :chartClasses="chartClasses"
            :formatDataValue="formatDataValue"
            :resolveDataColor="resolveDataColor"
            :resolveDataTooltip="resolveDataTooltip"
            :showTooltips="showTooltips"
        >
            <template v-slot:heading>
                <slot name="heading">{{ heading }}</slot>
            </template>
        </component>

        <slot name="legend" v-if="( $slots.legend || showLegend ) && this.datasets.length > 1">
            <ul :class="legendClasses">
                <li v-for="(dataset, index) in datasets" :key="dataset.name">
                    {{ dataset.name }}
                </li>
            </ul>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "chartscss",

        props: {
            type: { type: String, required: true, },
            height: { type: [String, Number], },
            heading: { type: String, required: true, },
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
            component()
            {
                return "chartscss-" + this.type;
            },
        },
    }
</script>
