const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/employee-database');
const parseBody = require('../lib/parse-body');

const auth = require("./auth");

var bcrypt = require('bcrypt');

function updateUser(req, res)
{
    parseBody(req, res, callback => {
        var data = callback.body;
        if(data.username != "")
        {
            db.employee.updateUser(data, (err) => {
                if(err) res.message = "** Filed to Update User **";
                else res.message = "** Updated User **";
                serveHome(req, res);
            });    
        }
        else
        {
            res.message = "** Filed to Update User **";
            serveHome(req, res);    
        }
    });
}

module.exports = updateUser;