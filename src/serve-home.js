const serve500 = require('./serve500');
const db = require('../data/database');

/** @function serveHome
  * Endpoint serving the home page
  * @param {http.IncomingMessage} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
function serveHome(req, res) {
  db.arrangements.featured(4, (err, arrangements) => {
    if(err) {
      console.log(`Error retrieving arrangements: ${err}`);
      serve500(req, res);
      return;
    }
    var arrangementList = res.templates.render("_arrangement-list.html", {arrangements: arrangements});
    var nav = res.templates.render("_nav.html", {url: req.url});
    var footer = res.templates.render("_footer.html", {});
    var content = res.templates.render("home.html", {arrangements: arrangementList});
    if (res.message) content += res.templates.render("message.html", {message: res.message});
    if(req.session && (req.session.role == "Admin" || req.session.role == "Employee")) content += res.templates.render("create-arrangement.html", {});
    var html = res.templates.render("_page.html", {
      page: "Home",
      navigation: nav,
      content: content,
      footer: footer
    });
    res.setHeader("Content-Type", "text/html");
    delete res.message;
     
         
    res.end(html);
  });
}

module.exports = serveHome;
