const r = require('rethinkdb')

class rethinker {

    constructor(config) {
        this.config = config
        this.connection = this.connect()
    }

    getConfig() {
        return this.config
    }

    getConn() {
        return this.connection
    }

    async connect() {
        try {
            this.connection = await r.connect(this.config)
            console.log('Connection rdb: Ready!')
            this.createDB()
        } catch (error) {
            console.log('ERR cannot connect:  ', error)
        }
    }

    async createDB() {

        let db = await r.dbCreate(this.config.db).run(this.connection)
        console.log('DB created: ', db.config_changes[0].new_val.name)

    }

    async get(tablename, id) {
        try {
            let data = await r.table(tablename).get(id).run(this.connection)
            return data._responses

        } catch (error) {
            console.log('ERR rethinkdb cannot get:  ', error)
            return null
        }
    }

    async findOne(tablename, criteria) {
        try {
            let data = await r.table(tablename).filter(criteria).run(this.connection)
            return data._responses[0].r[0]

        } catch (error) {
            console.log('ERR rethinkdb cannot find:  ', error)
            return null
        }
    }

    async filter(tablename, criteria) {
        try {
            let data = await r.db('social_network').table(tablename).filter(criteria).run(this.connection)
            return data._responses

        } catch (error) {
            console.log('ERR rethinkdb cannot filter:  ', error)
            return null
        }
    }


}

module.exports = rethinker