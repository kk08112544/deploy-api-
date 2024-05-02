const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const alcohol_controller = require("../controllers/alcohol.controller");
    var router = require("express").Router();
    router.get("/", authJwt,alcohol_controller.getAllAlcohol);
    router.post("/addToAlcohol",authJwt,alcohol_controller.addToAlcohol);
    router.put("/updateToAlcohol/:id",authJwt,alcohol_controller.updateToAlcohol);
    router.delete("/deleteToAlcohol/:id",authJwt,alcohol_controller.deleteToAlcohol);
    router.put("/updateStatusToAlcohol/:id",authJwt,alcohol_controller.updateStatusToAlcohol);
    app.use("/api/alcohol", router);
};