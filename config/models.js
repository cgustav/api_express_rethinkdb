//const thinker = require('./thinker')
const find_or_create = require('../lib/findOrCreate')
const {
    hashThis
} = require('../lib/hash_util')

module.exports = {

    init: async () => {
        const models = require('../api/models/index')

        /*=============================================
        =               RELATIONS                     =
        =============================================*/
        models.user.hasMany(models.identities, 'identities', 'id', 'user_id')
        models.identities.belongsTo(models.user, 'user', 'user_id', 'id')



        /*=============================================
        =               DUMP DATA                     =
        =============================================*/
        const hashed = '$2a$10$vLKJdMRqSXxXJL.3XPcYeOlz9.b0Jtsum0c0iRMMlNYSlZRvjKYWW' //1234

        let user = await find_or_create(models.user, {
            username: 'test',
            name: 'Pedro',
            email: 'test@test.cl',
            auth: {
                password: hashed //1234
            }
        })

        let user1 = await find_or_create(models.user, {
            username: 'admin',
            name: 'admin',
            email: 'admin@root.cl',
            auth: {
                password: hashed //1234
            }
        })

    }
}