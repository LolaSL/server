const bcrypt = require("bcryptjs");


module.exports = {

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(13);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    },

    // async validateCard(data) {

    // }

}
