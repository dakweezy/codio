var http = require('http');
const Router = require('./lib/router');
const Templates = require('./lib/templates');
const serveFile = require('./src/serve-file');
const serveHome = require('./src/serve-home');
const serveAnniversary = require('./src/serve-anniversary');
const serveBaby = require('./src/serve-baby');
const serveBirthday = require('./src/serve-birthday');
const serveProm = require('./src/serve-prom');
const serveSororitySisterhood = require('./src/serve-sorority-sisterhood');
const serveSympathy = require('./src/serve-sympathy');
const serveWedding = require('./src/serve-wedding');
const serveArrangement = require('./src/serve-arrangement');
const serveArrangementImage = require('./src/serve-arrangement-image');
const serve404 = require('./src/serve404');
const createArrangement = require('./src/create-arrangement');
const updateArrangement = require('./src/update-arrangement');
const employeeTools = require('./src/serve-employee-tools')
const login = require('./src/login');
const createUser = require('./src/create-user')
const updatePassword = require('./src/update-password')

const PORT = 3000;

var router = new Router(serve404);
var templates = new Templates("./templates");

router.addRoute("POST", "/update-password", updatePassword);
router.addRoute("POST", "/create-user", createUser);
router.addRoute("POST", "/login", login);
router.addRoute("GET", "/employee-tools", employeeTools);
router.addRoute("POST", "/update", updateArrangement);
router.addRoute("POST", "/create", createArrangement);
router.addRoute("GET", "/static/:filename", serveFile);
router.addRoute("GET", "/", serveHome);
router.addRoute("GET", "/index", serveHome);
router.addRoute("GET", "/index.html", serveHome);
router.addRoute("GET", "/anniversary", serveAnniversary);
router.addRoute("GET", "/baby", serveBaby);
router.addRoute("GET", "/birthday", serveBirthday);
router.addRoute("GET", "/prom", serveProm);
router.addRoute("GET", "/sorority-sisterhood", serveSororitySisterhood);
router.addRoute("GET", "/sympathy", serveSympathy);
router.addRoute("GET", "/weddings", serveWedding);
router.addRoute("GET", "/arrangements/:id", serveArrangement);
router.addRoute("GET", "/arrangement-images/:id", serveArrangementImage);

// Setup http server
var server = http.createServer((req, res) => {
  // Attach the template library to the response
  res.templates = templates;
  // TODO: Attach the database to the response
  router.route(req, res);
});

// Begin listening for requests
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
