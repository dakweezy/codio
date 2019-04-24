const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/database');
const parseBody = require('../lib/parse-body');

function updatePassword(req, res)
{
    parseBody(req, res, callback => {
        console.log(callback.body);  
    });
}

module.exports = updatePassword;