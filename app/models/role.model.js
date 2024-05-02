const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Roles = function(roles){
    this.role_name = roles.role_name;
}

Roles.getRole = (result) =>{
    sql.query("SELECT * FROM role",(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}

Roles.updateByRolesId = (id,newRoleName,result)=>{
    sql.query('SELECT * FROM role WHERE id=?',[id],
    (err,res)=>{
        if(err){
            console.log("Query error: " + err);
               result(err, null);
               return;
        }else{
            sql.query('UPDATE role SET role_name=? WHERE id=?',[newRoleName,id]
                ,(err,res)=>{
                if(err){
                    console.log("Query error: " + err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("Updated Role Id: ", { id: id, Role:newRoleName });
                result(null, { id: id, Role:newRoleName });
            })
        }
    })
}

Roles.create = (RolesObj,result)=>{
    sql.query("INSERT INTO role SET ?",RolesObj,(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, {id:res.insertId, ...RolesObj});
        console.log("Roles:", {id:res.insertId, ...RolesObj});
    })
}

Roles.deleteRolesById = (id, result) => {
    sql.query("DELETE FROM role WHERE id=?", [id], (err, res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Deleted user id: " + id);
        result(null, {id: id});
    } );
};


module.exports = Roles