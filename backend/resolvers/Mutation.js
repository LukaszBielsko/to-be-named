const Item = require('../mongo/schema')

const Mutation = {
    createItem: (parent ,args, ctx, info) => {
        const item = new Item({title: args.title, place: args.place, description: args.description})
        item.save( (err,item) => {
            if (err) return console.error('error', err)
        })
        return item.title
    }
}

module.exports = Mutation