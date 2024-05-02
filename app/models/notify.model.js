// const sql = require("./db");
// const jwt = require("jsonwebtoken");
// const scKey = require("../config/jwt.config");
// const bcrypt = require("bcryptjs/dist/bcrypt");
// const expireTime = "2h"; //token will expire in 2 hours
// const fs = require("fs");

// const Notify = function(notify){
//     this.room = notify.room;
//     this.detect = notify.detect;
//     this.status_name = notify.status_name;
// }

// Notify.Less = (result) => {
//     sql.query("SELECT * FROM alcohol WHERE detect = 1",(err,res)=>{
//         if(err){
//             console.log("Query err: " + err);
//             result(err,null);
//             return;
//         }
//         result(null, res);
//     })
// }


// Notify.Count = (result) =>{
//     sql.query("SELECT COUNT(*) as Total FROM alcohol WHERE detect = 1",(err,res)=>{
//         if(err){
//             console.log("Query err: " + err);
//             result(err,null);
//             return;
//         }
//         result(null, res);
//     })
// }

// module.exports = Notify;