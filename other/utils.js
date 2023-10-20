var dictHash = {};
const bcrypt = require("bcrypt");

async function encrypt(data) {
    const hash = await bcrypt.hash(data, 7);
    dictHash[data] = hash;
    console.log(`hashed password ${data}`);
}

async function compareData(data, hash) {
    const result = await bcrypt.compare(data, dictHash[data]);

    return result;
}

module.exports = { encrypt, compareData };
