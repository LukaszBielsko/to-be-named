const Item = require('../mongo/schema')

const Mutation = {
    createItem: (parent ,args, ctx, info) => {
        console.log('args', args)
        const item = new Item({title: args.title})
        console.log('item' ,item)
        item.save( (err,item) => {
            if (err) return console.error('error', err)
            console.log(`Item -- ${item.title} -- was added!`)
        })
        return item.title
    }
}

module.exports = Mutation