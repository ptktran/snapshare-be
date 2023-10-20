var dictHash = {};
const bcrypt = require("bcrypt");

function encrypt(data) {
    bcrypt.hash(data, 7, function (err, hash) {
        dictHash["data"] = hash;
    });
}

function compareData(data) {
    bcrypt.compare(data, dictHash["data"], function (err, result) {
        if (result) {
            console.log("Correct");
        } else {
            console.log("Incorrect");
        }
    });
}

module.exports = { encrypt, compareData };
