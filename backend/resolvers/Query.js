const Item = require('../mongo/schema')

const Query = {
    getStreetArts: () => {
        return Item.find({})
    }
}

module.exports = Query;