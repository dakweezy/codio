const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/database');
const parseBody = require('../lib/parse-body');

function createArrangement(req, res)
{
    var message = "";
    parseBody(req, res, callback => {
        if(callback.body.name != "" && callback.body.description != "")
        {
            db.arrangements.update(callback.body, err => {
                if(err) res.message = "** Failed to Update Arrangement **";
                else res.message = "** Updated Arrangement **";
                serveHome(req, res);
            });
        }
        else
        {
            res.message = "** Failed to Update Arrangement **";
            serveHome(req, res);
        }
    });
}

module.exports = createArrangement;