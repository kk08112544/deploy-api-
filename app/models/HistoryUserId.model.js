const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const HistoryUserId = function(historyuserid){
    this.his_id = historyuserid.his_id;
    this.alcohol_id = historyuserid.alcohol_id;
    this.detect = historyuserid.detect;
    this.dates = historyuserid.dates;
    this.times = historyuserid.times;
    this.user_id = historyuserid.user_id;
}




HistoryUserId.getHistoryUserId = (user_id, result) => {
    sql.query(
        `SELECT DISTINCT ah.id, ah.alcohol_id, a.room, ah.detect, DATE_FORMAT(ah.dates, '%Y-%m-%d') AS date, ah.times 
        FROM AlcoholHistory AS ah 
        JOIN alcohol AS a ON ah.alcohol_id = a.id 
        LEFT JOIN AlcoholHistoryRead AS ahr ON ahr.his_id = ah.id 
        WHERE ahr.user_id != ?
          AND (SELECT COUNT(*) FROM AlcoholHistoryRead AS ah2 WHERE ah2.his_id = ah.id AND ah2.user_id = ?) = 0 
        
        UNION 
        
        SELECT ah.id, ah.alcohol_id, NULL AS room, ah.detect, DATE_FORMAT(ah.dates, '%Y-%m-%d') AS date, ah.times 
        FROM AlcoholHistory AS ah 
        LEFT JOIN AlcoholHistoryRead AS ahr ON ahr.his_id = ah.id 
        WHERE ahr.his_id IS NULL;`,
        [user_id, user_id],
        (err, res) => {
            if (err) {
                console.log("Query err: " + err);
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

// HistoryUserId.gettotalHistoryUserId = (user_id, result) => {
//     sql.query(
//         `
//         SELECT COUNT(*) AS total
//         FROM (
//             SELECT DISTINCT ah.id, ah.alcohol_id, a.room, ah.detect, DATE_FORMAT(ah.dates, '%Y-%m-%d') AS date, ah.times 
//             FROM AlcoholHistory AS ah 
//             JOIN alcohol AS a ON ah.alcohol_id = a.id 
//             LEFT JOIN AlcoholHistoryRead AS ahr ON ahr.his_id = ah.id 
//             WHERE ahr.user_id != ?
//             AND (SELECT COUNT(*) FROM AlcoholHistoryRead AS ah2 WHERE ah2.his_id = ah.id AND ah2.user_id = ?) = 0 
            
//             UNION 
            
//             SELECT ah.id, ah.alcohol_id, NULL AS room, ah.detect, DATE_FORMAT(ah.dates, '%Y-%m-%d') AS date, ah.times 
//             FROM AlcoholHistory AS ah 
//             LEFT JOIN AlcoholHistoryRead AS ahr ON ahr.his_id = ah.id 
//             WHERE ahr.his_id IS NULL 
//         ) AS subquery;
//         `
// ,[user_id, user_id],
//     (err, res) => {
//         if (err) {
//             console.log("Query err: " + err);
//             result(err, null);
//             return;
//         }
//         result(null, res);
//     })
// }

HistoryUserId.create = (user_id, result) => {
    sql.query(
        `
        SELECT DISTINCT ah.id, ah.alcohol_id, a.room, ah.detect, DATE_FORMAT(ah.dates, '%Y-%m-%d') AS date, ah.times 
        FROM AlcoholHistory AS ah 
        JOIN alcohol AS a ON ah.alcohol_id = a.id 
        LEFT JOIN AlcoholHistoryRead AS ahr ON ahr.his_id = ah.id 
        WHERE ahr.user_id != ?
          AND (SELECT COUNT(*) FROM AlcoholHistoryRead AS ah2 WHERE ah2.his_id = ah.id AND ah2.user_id = ?) = 0 
        
        UNION 
        
        SELECT ah.id, ah.alcohol_id, NULL AS room, ah.detect, DATE_FORMAT(ah.dates, '%Y-%m-%d') AS date, ah.times 
        FROM AlcoholHistory AS ah 
        LEFT JOIN AlcoholHistoryRead AS ahr ON ahr.his_id = ah.id 
        WHERE ahr.his_id IS NULL;
        `
    ,[user_id, user_id],
    async (err, res) => {
        if (err) {
            console.log("Query err: " + err);
            result(err, null);
            return;
        }

        try {
            // Map the result to create newHistory array
            const newHistory = res.map(row => ({
                his_id: row.id,
                alcohol_id: row.alcohol_id,
                detect: row.detect,
                dates: row.date,
                times: row.times,
                user_id: user_id
            }));

            // Insert all newHistory records into AlcoholHistoryRead
            await Promise.all(
                newHistory.map(history => {
                    return new Promise((resolve, reject) => {
                        sql.query("INSERT INTO AlcoholHistoryRead SET ?", history, (err, res) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                    });
                })
            );

            result(null, res);

        } catch (error) {
            console.error("Error during INSERT operation: ", error);
            result(error, null);
        }
    });
}



HistoryUserId.getAllHistoryLook = (user_id, result) => {
    sql.query(
      `SELECT AH.id, A.room, AH.detect, DATE_FORMAT(AH.dates, '%Y-%m-%d') AS date, AH.times FROM AlcoholHistoryRead AHR INNER JOIN alcohol A ON 
       AHR.alcohol_id = A.id INNER JOIN AlcoholHistory AH ON AHR.alcohol_id = AH.alcohol_id WHERE AHR.user_id = ? AND AH.dates >= DATE_SUB(CURDATE(), 
       INTERVAL 90 DAY) GROUP BY AH.id, A.room, AH.detect, AH.dates, AH.times;`, [user_id], 
       (err, res) => {
        if (err) {
            console.log("Query err: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


module.exports =HistoryUserId;