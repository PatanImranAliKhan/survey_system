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
    survey_response : { 
        type: Object
    }
})

const survey_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    questions : [question_schema],
    isActive: {
        type: Boolean,
        default: true
    },
    dateOfCreation: {
        type: Date
    },
    dateOfExpiry: {
        type: Date
    },
    createdBy : {
        type: String
    }
});

module.exports = mongoose.model('Survey',survey_schema);