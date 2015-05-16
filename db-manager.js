use admin;
db.createUser({
    user:"root",
    pwd:"root",
    roles:["readWrite","dbAdmin"]
});

use test;
db.createUser({
    user:"test",
    pwd:"root",
    roles:["readWrite","dbAdmin"]
});