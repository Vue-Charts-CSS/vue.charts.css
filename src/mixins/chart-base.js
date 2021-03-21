export default {
    props: {
        height: {
            type: [String, Number],
            required: true,
        },
        labels: {
            type: Array,
            required: true,
        },
        datasets: {
            type: Array,
            required: true,
        },
        chartClasses: {
            type: String,
        },
        formatDataValue: {
            type: Function,
            required: true,
        },
        resolveDataColor: {
            type: Function,
            default: (value, label, datasetName, rowIndex, colIndex, hasMultipleDatasets = false) => null,
        },
        resolveDataTooltip: {
            type: Function,
            default: (value, label, datasetName, rowIndex, colIndex, hasMultipleDatasets = false) => null,
        },
        showTooltips: {
            type: Boolean,
            default: false,
        }
    },

    computed: {
        heightStyle()
        {
            if (typeof this.height === "string"){
                return this.height;
            }
            return this.height + "px";
        },
        datasetsCount()
        {
            return this.datasets.length;
        },
        hasHeading()
        {
            return !!this.$slots.heading;
        },
    },

    methods: {
        resolveDataStyle(value, rowIndex, colIndex)
        {
            let style = {'--size': value.size, };

            if (this.resolveDataColor){
                let color = this.resolveDataColor(value, value.label, value.datasetName, rowIndex, colIndex, this.datasetsCount > 1);

                if (color){
                    style["--color"] = color;
                }
            }

            return style;
        }
    }
}
