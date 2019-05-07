const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/employee-database');
const parseBody = require('../lib/parse-body');

var saltRounds = 10;
var bcrypt = require('bcrypt');


function createUser(req, res)
{
    parseBody(req, res, callback => {
        var newUser = callback.body;
        res.message = "temp";
        if(newUser.username != '' && newUser.password != '' && newUser.password == newUser.passwordConfirm)
        {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if (err) console.log("error 1");
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if (err) console.log("error 2");
                    newUser.salt = salt;
                    newUser.cryptedPassword = hash;
                    
                    db.employee.addUser(newUser, (err) => {
                        if (err) res.message = "** Failed to create user **";
                        else res.message = ("** User Creation Successful **");
                        serveHome(req, res);
                    });
                });
            });
        }
        else
        {
            res.message = ("** Failed to create user **");
            serveHome(req, res);
        }
    });
}

module.exports = createUser;