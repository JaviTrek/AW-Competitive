const bcrypt = require('bcryptjs');


function hashPassword(password){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

function comparePassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
    hashPassword,
    comparePassword
}