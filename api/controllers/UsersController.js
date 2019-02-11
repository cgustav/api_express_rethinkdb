const thinky = require('thinky');

const user_controller = {

    list: async (req, res) => {


    },

    search: async (req, res) => {
        const __id = parseInt(req.param('id'))

        res.json(__id)
        //console.log(__id)
    },

    create: async (req, res) => {

    }

};

module.exports = user_controller;