const User = require("../models/user.model")
const bcrypt = require("bcryptjs");

const validUsername = (req, res) => {
    User.checkUsername(req.params.us, (err, data)=>{
        if(err) {
            if(err.kind == "not_found"){
                res.send({
                    message: "Not Found: " + req.params.us,
                    valid: true
                });
            }
            else {
                res.status(500).send({ 
                    message: "Error query: " + req.params.us
                });
            }
        }else{
            res.send({record: data, valid: false});
        }
    });
};

const createNewUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty." });
    }

    const salt = bcrypt.genSaltSync(10);
    const userObj = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        role_id: req.body.role_id,
        img: req.body.img,
    });
    User.create(userObj, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occured while creating" });
        } else res.send(data);
    });
};

const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: "Content can not be empty." });
    }
    const acc = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.loginModel(acc, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                return res.status(401).send({ message: "Not found " + req.body.username });
            } else if (err.kind == "invalid_pass") {
                return res.status(401).send({ message: "Invalid Password" });
            } else {
                return res.status(500).send({ message: "Query error." });
            }
        }
        res.send(data);
    });
};


const getAllUsers = (req,res)=>{
    User.getAllRecords((err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
};

const getProfileId = (req,res) =>{
    User.getProfile(req.params.id,(err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
}

const updateUserCtrl = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const id = req.params.id;
    const data = {
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        role_id: req.body.role_id,
        img: req.body.img
    };
    User.updateUser(id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send(
                    {message: "Not found user: " + req.params.id}
                    );
            }else {
                res.status(500).send(
                    {message: "Error update user: " + req.params.id}
                );
            }
        }else {
            res.send(result);
        }
    });
};

const deleteUser = (req, res)=>{

    const id = req.params.id;
    
    User.removeUser(id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send(
                    {message: "Not found user: " + req.params.id}
                    );
            }
            else{
                res.status(500).send(
                    {message: "Error delete user: " + req.params.id}
                    );
            }
        }else{
            res.send(result);
        }
    });
};





module.exports = { 
    validUsername, 
    createNewUser, 
    login,
    getAllUsers,
    getProfileId,
    updateUserCtrl,
    deleteUser,
}
