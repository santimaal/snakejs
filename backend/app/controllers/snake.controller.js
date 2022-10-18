var mongoose = require('mongoose');
var database = require('../../../DB/database.config');

exports.findAll = async (req, res) => {
    await res.json(database);
}

exports.register = async (req, res) => {
console.log("hola");
    const confirm_user = database.find(user => {
        return user.username == req.params.username
    });
    if (confirm_user == undefined) {
        db_users.push({ username: req.params.username, pass: req.params.pass });
        res.json(req.params.username);
    } else {
        res.json("User exists")
    }
}