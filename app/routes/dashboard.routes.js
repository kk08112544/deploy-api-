const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const dashboard_controller = require("../controllers/dashboard.controller");
    var router = require("express").Router();
    router.get("/total", authJwt,dashboard_controller.getAllTotal);
    router.get("/day",authJwt,dashboard_controller.getThisDay);
    router.get("/total_room",authJwt,dashboard_controller.getTotalRoom);
    router.get("/totalRoles",authJwt,dashboard_controller.getAllRole);
    router.get("/getTotalUser",authJwt,dashboard_controller.getTotalUser);
    router.get("/totalChange",authJwt,dashboard_controller.getChange);
    app.use("/api/dashboard", router);
};