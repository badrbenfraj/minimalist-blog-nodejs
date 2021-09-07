const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    markdown: {
        required: true,
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', articleSchema)