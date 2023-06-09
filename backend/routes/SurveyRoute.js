const express = require('express')

const SurveyModel = require('../Models/SurveyModel');

const surveyRouter = express.Router();

const cron = require('node-cron');

surveyRouter.route('/post').post(async(req,res,next) => {
    const survey = new SurveyModel(req.body);
    await survey.save()
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

surveyRouter.route("/getServeyDetailsList/:email").get(async(req,res,next) => {

    const email = req.params.email;
    var response = {};
    await SurveyModel.find({ createdBy: email })
    .then((resp) => {
        response['surveyDetailsOfUser'] = resp;
    })
    .catch((err) => {
        console.log("Failed to gather Survey Details");
        console.log(err);
        response['surveyDetailsOfUser'] = [];
    })

    await SurveyModel.find({ createdBy: { $ne: email }, isActive: true})
    .then((resp) => {
        response['surveyDetailsOfOthers'] = resp;
    })
    .catch((err) => {
        console.log("error in caching others survey details : ",err);
        response['surveyDetailsOfOthers'] = [];
    })
    res.json({
        "response": response
    })
})

surveyRouter.route("/getSurvey/:id").get(async(req,res,next) => {
    await SurveyModel.findById(req.params.id)
    .then((resp) => {
        res.json({
            "status": "Success",
            "details": resp
        })
    })
    .catch((err) => {
        console.log("Failed to gather Survey Details");
        console.log(err);
        res.json({
            "status": "Failed",
            "details": {}
        })
    })
})

surveyRouter.route("/update/:id").put(async(req,res,next) => {
    console.log("update request"+ req.body);
    await SurveyModel.findByIdAndUpdate(req.params.id, {
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

surveyRouter.route("/updateActive/:id/:active/:expiry_data").put(async(req,res,next) => {
    console.log(req.params.active);
    await SurveyModel.findByIdAndUpdate(req.params.id, {
        isActive: req.params.active,
        dateOfExpiry: req.params.expiry_data
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



surveyRouter.route("/delete/:id").delete(async(req,res,next) => {
    await SurveyModel.findByIdAndDelete(req.params.id)
    .then((resp) => {
        console.log("success deleted");
        console.log(resp);
    })
})

cron.schedule("0 0 0 * * *", async function() {
    var today = new Date();
    await SurveyModel.find({isActive: true})
    .then((resp) => {
        if(resp==[])
        {
            return;
        }
        resp.forEach((item, i) => {
            if(new Date(item.dateOfCreation) - today)
            {
                makeInActiveSurvey(item._id);
            }
        })
    })
});

async function makeInActiveSurvey(id)
{
    await SurveyModel.findByIdAndUpdate(id, {
        isActive: false
    })
    .then((resp) => {
        console.log("updated is Activate ");
        console.log(resp);
    })
}

// 0 0 0 * * *

module.exports = surveyRouter;