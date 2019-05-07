const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/database');
const parseBody = require('../lib/parse-body');

function createArrangement(req, res)
{
    parseBody(req, res, callback => {
        console.log(callback.body);
        if(callback.body.name != "" && callback.body.description && callback.body.image != '')
        {
            res.message = "temp";
            db.arrangements.create(callback.body, err => {
                if(err) res.message = "** Failed to Create Arrangement **";
                else res.message = "** Created Arrangement **";
                serveHome(req, res);
            });    
        }
        else
        {
            res.message = "** Failed to Create Arrangement **";
            serveHome(req, res);
        }  
    });
}

module.exports = createArrangement;