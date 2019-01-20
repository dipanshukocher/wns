const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieChartSchema = new Schema({
    // _id: Schema.ObjectId,
    key: {
        type: String,
    },
    y: {
        type: Number
    }
});

const piechart =  mongoose.model('piechart', pieChartSchema);
module.exports = piechart;