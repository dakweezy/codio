/** @function serveSororitySisterhood
  * Endpoint serving the sorority sisterhood page 
  * @param {http.IncomingMessage} req - the request object
  * @param {http.ServerResponse} res - the response object
  */
function serveEmployeeTools(req, res) {
  var nav = res.templates.render("_nav.html", {url: req.url});
  var footer = res.templates.render("_footer.html", {});
  var content = "";
  if(true) content += res.templates.render("login.html", {});
  if(true) content += res.templates.render("update-password.html", {});
  if(true) content += res.templates.render("create-user.html", {});
  var html = res.templates.render("_page.html", {
    page: "Employee Tools",
    navigation: nav,
    content: content,
    footer: footer
  });
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}

module.exports = serveEmployeeTools;