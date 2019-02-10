const r = require('rethinkdb')
const db_config = require('../config/database');

r.connect(db_config)
    .then(connection => {
        module.exports.get = (table_name, id) => {

            r.table(table_name).get(id).run(connection)
                .then(data => {

                    return data._responses[0]
                })
                .catch(error => {
                    console.log('ERR cannot find:  ', error)
                })

        }

        module.exports.filter = (table_name, criteria) => {
            return r.table(table_name).filter(criteria).run(connection)
                .then(result => {

                    return result._responses
                })
                .catch(error => {
                    console.log('ERR cannot filter:  ', error)
                })
        }

        module.exports.findOne = (table_name, criteria) => {
            return r.table(table_name).filter(criteria).run(connection)
                .then(data => {

                    return data._responses[0].r[0]
                })
                .catch(error => {
                    console.log('ERR cannot filter:  ', error)
                })
        }

        



    });

/* DEPRECATED
class rethinker {

    constructor(config) {
        this.config = config
    }

    async connect() {
        try {

            return await r.connect(this.config)

        } catch (error) {
            console.log('ERR cannot connect:  ', error)
        }
    }

    async find(tablename, id) {
        try {

            return await r.db('social_network').table(tablename).get(id).run(this.connect())

        } catch (error) {
            console.log('ERR rethinkdb cannot find:  ', error)
            return null
        }
    }

    async filter(tablename, criteria) {
        try {

            return await r.db('social_network').table(tablename).filter(criteria).run(this.connection)

        } catch (error) {
            console.log('ERR rethinkdb cannot filter:  ', error)
            return null
        }
    }

    getConfig() {
        return this.config
    }
}

module.exports = rethinker
/*
module.exports.find = (tablename, id) => {
    return 
}
*/