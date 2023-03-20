const express = require('express')
const userModel = require('../Models/userModel')
const router = express.Router()

router.post('/add',async (req,res)=>{
    const user = new userModel({
        username : req.body.username,
        email : req.body.email,
        address : req.body.address,
        mobile : req.body.mobile,
        password : req.body.password,
    })

    try{
        const saveStatus = await user.save();
        console.log(user, saveStatus);
        res.json({
            "status":"Success",
            "details": saveStatus
        })
    }
    catch(err){
        res.json({
            "status":"Error"
        })
    }
})

router.get('/login/:email/:password',async (req,res)=>{
    var email = req.params.email
    var password = req.params.password

    try{
       const user =  await userModel.findOne({email:email, password: password})
       res.setHeader("Content-Type", "application/json");
       if(user==null){
        console.log("notfound");
            return res.status(404).json({status : "Error"});
        //    res.json({status : "NotFound"})
       }
       else{
            return res.status(200).json({status : "Success",details:user});
          
       }
    }
    catch(err){
        res.json({
            "status":"Error"
        })
    }
})


router.put('/update/:email',async (req,res)=>{
    try{
        await userModel.findByIdAndUpdate(req.params.email,{
            username : req.body.username,
            email : req.body.email,
            address : req.body.address,
            mobile : req.body.mobile,
            password : req.body.password,
        });
        res.json({status : 'updated'})
    }
    catch(err){
        res.json({error: err})
    }
})

router.put('/delete/:id',async (req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.json({status : 'deleted'})
    }
    catch(err){
        res.json({error: err})
    }
})

module.exports = router