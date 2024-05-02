const Roles = require("../models/role.model")
const bcrypt = require("bcryptjs");


const getRoles = (req,res) => {
    Roles.getRole((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}


const updateToRoles = (req,res) => {
    const id = req.params.id;
    if(!req.body.role_name){
        res.status(400).send({message: "Content can not be empty."});
    }
 
    const newRoleName=req.body.role_name
    Roles.updateByRolesId( id, newRoleName,(err,result)=>{
        if(err) {
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Role id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error updating Role Name by id: " + req.params.id,
                });
            }
        }
        else res.send(result);
    })
}

const addToRoles = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const RolesObj = new Roles({
        role_name: req.body.role_name,
    
    });

    Roles.create(RolesObj,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    });
}


const deleteToRoles = (req,res) => {
    const id = req.params.id;
    Roles.deleteRolesById (id,(err,data)=>{
        if (err) {
            if (err.kind == "not_found") {
              res.status(401).send({
                message: "Not found Roles id: " + req.params.id,
              });
            } else {
              res.status(500).send({
                message: "Error Delete Roles id: " + req.params.id,
              });
            }
          } else res.send(data);
    })
}

module.exports = { 
    getRoles,
    updateToRoles,
    addToRoles,
    deleteToRoles,
};