const _ = require('lodash')


module.exports = function args(value) {

    for (const argument of arguments) {
        if (_.isEmpty(argument)) return true        
    }

    return false
}