//åconst thinker =  require('../../config/thinker')

const home_controller = {};

home_controller.host = async (req, res) => {

    /*
    let lister = await thinker.findOne('users', {
        username: 'cgustav'
    })
 */
    let conff = thinker.getConfig()

    res.json({
        message: 'Welcome!',
        result: lister,
        config: conff
    }).status(200)
}

module.exports = home_controller;