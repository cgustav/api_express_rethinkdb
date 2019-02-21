const find_or_create = require('../lib/findOrCreate')

module.exports = {

    init: async() => {
        const models = require('../api/models/index')

        /*=============================================
        =               RELATIONS                     =
        =============================================*/
        models.identities.belongsTo(models.user, 'user', 'user_id', 'id')



        /*=============================================
        =               DUMP DATA                     =
        =============================================*/
        let password = "1234"

        const USER = await find_or_create(models.user, {
            username: 'test',
            name: 'Pedro',
            email: 'test@test.cl',
            auth: {
                password
            }
        })

        const USER1 = await find_or_create(models.user, {
            username: 'admin',
            name: 'admin',
            email: 'admin@root.cl',
            auth: {
                password
            }
        })

    }
}