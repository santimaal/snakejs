var mongoose = require('mongoose');
var database = require('../../../DB/database.config');

exports.findAll = async (req, res) => {
    await res.json(database);
}

exports.register = async (req, res) => {
    const confirm_user = database.find(user => {
        return user.username == req.params.username
    });
    if (confirm_user == undefined) {
        db_users.push({ username: req.params.username, pass: req.params.pass });
        res.json(req.params.username);
    } else {
        res.json("Error")
    }
}

exports.login = async (req, res) => {
    const confirm_user = database.find(user => {
        return user.username == req.params.username && user.pass == req.params.pass
    });
    if (confirm_user != undefined) {
        res.json(req.params.username);
    } else {
        res.json("Error")
    }
}