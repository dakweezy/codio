var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/flowers.db');

var employee = {}

employee.destroyDatabase = function() {
    db.run(`DROP TABLE users`, 
         (err) => {console.log(err);});
}

employee.updateUser = function (data, callback) {
    db.run("UPDATE users SET role = ? WHERE username = ?",
          data.userType,
          data.username,
          function(err){
             if(err) return callback(err);
             else return callback();
           }
     );
}

employee.updatePassword = function(user, callback) {
    db.run("UPDATE users SET cryptedPassword = ? WHERE id = ?",
          user.cryptedPassword,
          user.id,
          function(err){
             if(err) return callback(err);
             else return callback();
          }
     );
}

employee.updateRole = function (user, callback) {
    db.run("UPDATE users SET role = ? WHERE username = ?",
          user.role,
          user.username,
          function(err){
             if(err) return callback(err);
             else return callback();
          }
     );
}

employee.createDatabase = function() {
     db.run(`CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          username VARCHAR(75),
          salt VARCHAR(75),
          cryptedPassword VARCHAR(75),
          role VARCHAR(10)
        )`, (err) => {console.log(err);}
            
         
    );
    console.log("end");
}

employee.addUser = function(newUser, callback) {
    db.run("INSERT INTO users (username, cryptedPassword, salt, role) VALUES(?,?,?,?)",
        newUser.username, newUser.cryptedPassword, newUser.salt, newUser.userType, 
        function(err) {
            if(err)  callback(err);
            else callback();
        }
     )
}

employee.getUser = function(user, callback) {
    sql = `SELECT * FROM users WHERE username = ?;`;
    db.get(sql, user.username, (err, row) => {
        if(err) return callback(err)
        if(!row) return callback("Not found");
        callback(false, row)
    }) 
}

module.exports = {employee};