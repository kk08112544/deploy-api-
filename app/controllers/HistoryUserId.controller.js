const HistoryUserId = require('../models/HistoryUserId.model');
const bcrypt = require("bcryptjs");

const getHistoryUserId = (req,res) => {
    
    const user_id = req.params.user_id;

    HistoryUserId.getHistoryUserId(user_id,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

// const gettotalHistoryUserId = (req,res) => {
//     HistoryUserId.gettotalHistoryUserId(req.params.user_id,(err,data)=>{
//         if(err){
//             res.status(500).send({message: err.message || "Some error ocurred."});
//         }else res.send(data);
//     })
// }

const createNewHistory = (req,res) => {
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10); // yyyy-mm-dd
    const time = currentDate.toTimeString().slice(0, 8); // hh:mm:ss
    // console.log("History Id:" ,req.body.his_id)
    // console.log("Alcohol Id:" ,req.body.alcohol_id)
    // console.log("Detect:" ,req.body.detect)
    // console.log("Dates:" ,date);
    // console.log("Times:" ,time);
    // console.log("User Id:", req.body.user_id)
    // const newHistory = new HistoryUserId({
    //     his_id: req.body.his_id,
    //     alcohol_id : req.body.alcohol_id,
    //     detect: req.body.detect,
    //     dates: date,
    //     times: time,
    //     user_id: req.body.user_id,
    // })
    let user_id = req.body.user_id
    HistoryUserId.create(user_id, (err,data)=>{
        if (err) {
            res.status(500).send({ message: err.message || "Some error occured while creating" });
        } else res.send(data);
    })
}


const getHistoryUserIdLook = (req,res) => {
    HistoryUserId.getAllHistoryLook(req.params.user_id,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

module.exports = {
    getHistoryUserId,
    createNewHistory,
    // gettotalHistoryUserId,
    getHistoryUserIdLook,
}