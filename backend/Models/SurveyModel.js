const mongoose = require('mongoose')

const question_schema = new mongoose.Schema({
    description : {
        type: String,
        required: true
    },
    questionType : {
        type: String,
        required: true
    },
    options: [String],
    survey_responses : { any: mongoose.Schema.Types.Mixed }
})

const survey_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    question : [question_schema]
});

module.exports = mongoose.model('Survey',survey_schema);