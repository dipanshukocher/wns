const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabularSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: Object,
    },
    phone : {
        type: String,
    },
    website : {
        type: String,
    },
    company : {
        type: Object
    }
});

const Tabular = mongoose.model('tabular', tabularSchema);

module.exports = Tabular;