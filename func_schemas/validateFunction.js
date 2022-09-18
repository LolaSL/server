const bcrypt = require("bcryptjs");

module.exports = {

    async hashPassword(password) {

        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt,);
        console.log(hashPassword);
        return hashPassword;
      
    },

}
