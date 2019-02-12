//const thinker = require('./thinker')
const find_or_create = require('../lib/findOrCreate')
const {
    hashThis
} = require('../lib/hash_util')

module.exports = {

    init: async () => {
        const models = require('../api/models/index')

        let user = await find_or_create(models.user, {
            username: 'dropex',
            name: 'Pedro',
            email: 'pedro@pedro.cl',
            auth: {
                password: '1234' //1234
            }
        })

        let user1 = await find_or_create(models.user, {
            username: 'cgustav',
            name: 'Eduardo',
            email: 'edo@edo.cl',
            auth: {
                password: '1234' //1234
            }
        })

    }
}