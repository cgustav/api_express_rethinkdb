const bcrypt = require('bcryptjs')


module.exports = {
    hashThis: async (value) => {
        try {

            let salt = await bcrypt.genSalt()
            return await bcrypt.hash(value, salt)

        } catch (error) {
            
            console.log('bcrypt cannot hash', error)
            return undefined
        }
    },

    /*
    hashCompare: async (password) => {

    }
    */
}