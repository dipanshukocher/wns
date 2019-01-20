const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barChartSchema = new Schema({
    key: {
        type: String,
    },
    values: {
        type: Object
    }
});

const BarChart = mongoose.model('barchart', barChartSchema);

module.exports = BarChart;