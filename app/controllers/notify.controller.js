// const Notify = require("../models/notify.model")
// const bcrypt = require("bcryptjs");

// const getLess = (req,res)=>{
//     Notify.Less((err,data)=>{
//         if(err){
//             res.status(500).send({message: err.message || "Some error ocurred."});
//         }else res.send(data);
//     })
// }

// const notifyCount = (req,res)=>{
//     Notify.Count((err,data)=>{
//         if(err){
//             res.status(500).send({message: err.message || "Some error ocurred."});
//         }else res.send(data);
//     })
// }

// module.exports = {
//     getLess,
//     notifyCount,
// }