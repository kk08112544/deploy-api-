const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Dashboard = function(dashboard){
    this.room_id = dashboard.room_id;
    this.date = dashboard.date;
    this.times = dashboard.times;
    // this.alcohol_zone = dashboard.alcohol_zone;
    // this.detect = dashboard.detect;
}

Dashboard.getAll = (result) => {
    sql.query("SELECT COUNT(*) as total FROM used;", (err, res) => {
        if (err) {
            console.log("Query err: " + err);
            result(err, null);
            return;
        }
        // ส่งผลลัพธ์เฉพาะตัวเลข total กลับไป
        result(null, res);
    });
};


Dashboard.getDay = (result)=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    sql.query("SELECT COUNT(*) as Day FROM used WHERE DATE(date) = ?",[formattedDate],(err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
};



Dashboard.getRole = (result) => {
    sql.query('SELECT COUNT(*) as Total_Role FROM role',(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}

Dashboard.getUser = (result) => {
    sql.query('SELECT COUNT(*) as Total_User FROM user',(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}


Dashboard.getAllRoom = (result) => {
    sql.query('SELECT COUNT(*) as Total_Room FROM alcohol',(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}


Dashboard.ChangeAlcohol = (result) => {
    sql.query('SELECT COUNT(*) as Total_Change FROM AlcoholHistory WHERE detect = 0',(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}

module.exports = Dashboard;