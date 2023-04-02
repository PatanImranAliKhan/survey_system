const express = require('express')

const SurveyModel = require('../Models/SurveyModel');

const surveyRouter = express.Router();

surveyRouter.route('/post').post((req,res,next) => {
    const survey = new SurveyModel(req.body);
    survey.save()
    .then((resp) => {
        console.log("survey added to db");
        console.log(resp);
        res.json({
            "status":"Success"
        })
    })
    .catch((err) => {
        console.log("Error in posting survey in db");
        res.json({
            "status":"Failed"
        })
    })
});

surveyRouter.route("/getall").get((req,res,next) => {

    SurveyModel.find({})
    .then((resp) => {
        res.json({
            "details": resp
        })
    })
    .catch((err) => {
        res.json({
            "details": []
        })
    })
})

surveyRouter.route("/getSurvey/:id").get((req,res,next) => {
    SurveyModel.findById(req.params.id)
    .then((resp) => {
        console.log("response: "+resp);
        res.json({
            "status": "Success",
            "surveyDetails": resp
        })
    })
    .catch((err) => {
        console.log("Failed to gather Survey Details");
        console.log(err);
        res.json({
            "status": "Failed",
            "surveyDetails": []
        })
    })
})

surveyRouter.route("/update/:id").put((req,res,next) => {
    console.log("update request"+ req.body);
    SurveyModel.findByIdAndUpdate(req.params.id, {
        questions: req.body
    })
    .then((resp) => {
        console.log("SuccessFully updated");
        res.json({
            "status": "Success",
            "details": resp
        })
    })
    .catch((err) => {
        console.log("error in updating the response");
        console.log(err);
        res.json({
            "status": "Failure"
        })
    })
})

surveyRouter.route("/updateActive/:id/:active").put((req,res,next) => {
    console.log("active");
    console.log(req.params.active);
    SurveyModel.findByIdAndUpdate(req.params.id, {
        isActive: req.params.active
    })
    .then((resp) => {
        console.log("SuccessFully updated");
        res.json({
            "status": "Success",
            "details": resp
        })
    })
    .catch((err) => {
        console.log("error in updating the response");
        console.log(err);
        res.json({
            "status": "Failure"
        })
    })
})



surveyRouter.route("/delete/:id").delete((req,res,next) => {
    SurveyModel.findByIdAndDelete(req.params.id)
    .then((resp) => {
        console.log("success deleted");
        console.log(resp);
    })
})

module.exports = surveyRouter;