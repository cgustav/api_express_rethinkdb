const _ = require('lodash')

module.exports = async function (model, query) {

  let _query = JSON.parse(JSON.stringify(query))
  let exists = await model.filter(_query).run()

  if (_.isEmpty(exists)) {
    let create_record = new model(query)
    let result = await create_record.saveAll()

    return result
  } else {

    return exists[0]
  }
}

return module.exports