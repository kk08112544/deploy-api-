const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const historyuser_id_controller = require("../controllers/HistoryUserId.controller");
    var router = require("express").Router();
    router.get('/:user_id',authJwt,historyuser_id_controller.getHistoryUserId);
    router.post('/createHistory',authJwt,historyuser_id_controller.createNewHistory);
    router.get('/look/:user_id',authJwt,historyuser_id_controller.getHistoryUserIdLook);
    app.use("/api/HistoryUserId", router);
};