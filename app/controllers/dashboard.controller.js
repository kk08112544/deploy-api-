const Dashboard = require("../models/dashboard.model")
const bcrypt = require("bcryptjs");


const getAllTotal = (req,res) => {
    Dashboard.getAll((err,data)=>{
        if(err){
            res.status(400).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const getThisDay = (req,res) => {
    Dashboard.getDay((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
}


const getTotalRoom = (req,res) => {
    Dashboard.getAllRoom((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}


const getTotalUser = (req,res) => {
    Dashboard.getUser((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const getAllRole = (req,res) => {
    Dashboard.getRole((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const getChange = (req,res) => {
    Dashboard.ChangeAlcohol((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}



module.exports = {
    getAllTotal,
    getThisDay,
    getTotalRoom,
    getTotalUser,
    getAllRole,
    getChange,
}