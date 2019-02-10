const thinker = require('../../lib/rethinkdb')

//const thinker = new rethinkdb(require('../../config/database'))

const home_controller = {};

home_controller.host = async (req, res) => {
    
    let lister = await thinker.filter('users', {
        username: 'cgustav'
    })

    //let wea = await thinker.connect()
    
    //let config =  thinker.getConfig()
    res.json({
        message: 'Welcome!',
        result: lister
    }).status(200)
}

module.exports =  home_controller;