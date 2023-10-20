var dictHash = {};
const bcrypt = require("bcrypt");

function encrypt(data) {
    bcrypt
        .hash(data, 7)
        .then((hash) => {
            const customPromise = new Promise((resolve, reject) => {
                dictHash[data] = hash;

                if (true) {
                    resolve(`hashed password ${data}`);
                } else {
                    reject(new Error(`failed to has password ${data}`));
                }
            });

            return promise;
        })
        .catch((err) => {
            console.log(err);
        });
}

function compareData(data) {
    bcrypt
        .compare(data, dictHash[data])
        .then((result) => {
            return "result";
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { encrypt, compareData };
