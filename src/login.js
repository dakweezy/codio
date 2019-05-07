const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/employee-database');
const parseBody = require('../lib/parse-body');
const auth = require("./auth");

var saltRounds = 10;
var bcrypt = require('bcrypt');

function login(req, res)
{
    parseBody(req, res, callback => {
        var user = callback.body;
        if(user.username != '' && user.password != '')
        {
            db.employee.getUser(user, (err, data) => {
                if(err) console.log(err);
                else {
                    var temp = "temp";
                    bcrypt.compare(user.password, data.cryptedPassword, (err, resp) => {
                        if(resp) 
                        {
                            res.message = "** Successful Login **";
                            auth.create(req, res, data, function(req, res) {
                                serveHome(req, res);
                            });
                        }
                        else  
                        {
                            res.message = "** Bad Login **";
                            serveHome(req, res);
                        }
                    });
                }
            });
        }
        else 
        {
           res.message = "** Bad Login **";       
           serveHome(req, res);
        }
    });
}

module.exports = login;