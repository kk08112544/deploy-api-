const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Alcohol = function(alcohol){
    this.room = alcohol.room;
    this.detect =alcohol.detect;
    this.status_id = alcohol.status_id;
}
// SELECT alcohol.id, alcohol.room, alcohol.detect, status.status_name FROM alcohol JOIN status ON alcohol.status_id = status.id
Alcohol.getAlcohol = (result)=>{
    sql.query(`SELECT alcohol.id, alcohol.room, alcohol.detect,alcohol.status_id ,
               status.status_name FROM alcohol JOIN status ON alcohol.status_id = status.id`,  (err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
}


// Alcohol.checkRoom = (room,result) =>{
//     sql.query("SELECT * FROM alcohol WHERE room='"+room+"'",(err,res)=>{
//         if(err){
//             console.log("Error: " + err);
//             result(err, null);
//             return;
//         }
//         if(res.length){
//             console.log("Found username: " + res[0]);
//             result(null, res[0]);
//             return;
//         }
//         result({ kind: "not_found"}, null);
//     });
// }


Alcohol.addAlcohol = (AlcoholObj,result)=>{
    sql.query("INSERT INTO alcohol SET ?", AlcoholObj,(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, {id:res.insertId, ...AlcoholObj});
        console.log("Created Alcohol:", {id:res.insertId, ...AlcoholObj});
    });
}

// Alcohol.getAlcoholId = (id,result) => {
//     sql.query("SELECT * FROM alcohol WHERE id = ?",[id],(err,res)=>{
//         if(err){
//             console.log("Query err: " + err);
//             result(err,null);
//             return;
//         }
//         result(null, res);
//     })
// }



Alcohol.updateAlcoholId = (id,newRoom,result) => {

    sql.query(`UPDATE alcohol SET room = ? WHERE id=?`,[newRoom,id],
    (err,res)=>{
        if (err) {
            console.log("Error: " + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // No record updated
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Update Alcohol: " + { id: id, ...newRoom });
        result(null, { id: id, ...newRoom });
    })
}

Alcohol.deleteAlcoholId = (id, result)=>{

    sql.query("DELETE FROM alcohol WHERE id=?",[id],(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Deleted Alcohol id: " + id);
        result(null, {id: id});
    })
}

Alcohol.updateStatusAlcoholById = (id,newStatus,result)=>{
    sql.query('UPDATE alcohol SET status_id=? WHERE id=?',[newStatus,id],
    (err,res)=>{
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated Status Alcohol Id: ", { id: id, Status:newStatus });
        result(null, { id: id, Status:newStatus });
    })
}

module.exports = Alcohol;