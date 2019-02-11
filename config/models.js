//const thinker = require('./thinker')
const find_or_create=  require('../lib/findOrCreate')

module.exports = {

    init: async () => {
        const models = require('../api/models/index')

        let data = await find_or_create(models.user,{
            name: 'Pedro',
            email: 'pedring@cool.cl',
            auth:{
                password: '1234'
            }
        })

        let data1 = await find_or_create(models.user,{
            name: 'Eduardo',
            email: 'edo@edo.cl',
            auth:{
                password: '1234'
            }
        })
        
    }
}