const mongoose = require('mongoose')

const templateSchema = mongoose.Schema({
    name: String,
    text: String
},{
    timestamps: true,
});

const template = mongoose.model('Template', templateSchema);

module.exports = template;
