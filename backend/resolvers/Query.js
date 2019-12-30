const db = require("../mongo/schema");
const Item = db.Item
const User = db.User

const Query = {
  items: async () => {
    const items = await Item.find({});
    return items;
  },
  item: async (obj, args, context, info) => {
    const item = await Item.findById(args.id); //with id
    return item;
  },
  me: async (obj, args, context, info) => {
    const user = await User.findById(context.request.userId)
    if (!user) return null
    return user
  }
};

module.exports = Query;
