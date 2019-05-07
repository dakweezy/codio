const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/employee-database');
const parseBody = require('../lib/parse-body');

const auth = require("./auth");

var bcrypt = require('bcrypt');

function updatePassword(req, res)
{
    parseBody(req, res, callback => {
        var data = callback.body;
        var user = req.session;
        //console.log(data);
        //console.log(user);
        if(user.currentPassword != '' && user.newPassword != '' && user.newPassword == user.passwordNewConfirm)
        {
             bcrypt.compare(data.currentPassword, user.cryptedPassword, (err, resp) => {
                 if(resp) 
                 {
                     bcrypt.genSalt(10, function(err, salt) {
                        if (err) console.log("error 1");
                        bcrypt.hash(data.newPassword, salt, function(err, hash) {
                            if (err) console.log("error 2");
                            user.cryptedPassword = hash;
                            db.employee.updatePassword(user, (err) => {
                                if (err) res.message = "** Filed ro Update Password **";
                                else res.message = "** Password Change Successful **";
                                auth.update(user, req.sessionId);
                                serveHome(req, res);
                            });
                        });
                    });
                 }
                 else  
                 {
                     res.message = "** Filed to Update Password **";
                     serveHome(req, res);
                 }
             
             })
        }
        else
        {
            res.message = "** Failed to Update Password **";
            serveHome(req, res);        
        }
    });
}

module.exports = updatePassword;