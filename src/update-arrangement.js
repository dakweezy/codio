const serve500 = require('./serve500');
const serveHome = require('./serve-home');
const db = require('../data/database');
const parseBody = require('../lib/parse-body');

function createArrangement(req, res)
{
    parseBody(req, res, callback => {
        db.arrangements.update(callback.body, err => {
            if(err) serve500(req, res);
            else serveHome(req, res);
        });
    });
}

module.exports = createArrangement;