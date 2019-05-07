const uuidv1 = require('uuidv1');

var users = {};
var auth = {};


auth.create = function (req, res, user, callback)
{
    var id = uuidv1();
    users[id] = user;
    res.setHeader("Set-Cookie", `ID=${id};`);
    req.session = users[id];
    callback(req, res);
}

auth.update = function(user, id)
{
    users[id] = user;
}

auth.getUser = function(id)
{
    return users[id];
}

module.exports = auth;