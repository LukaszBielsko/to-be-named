const Item = require("../mongo/schema");

const Query = {
  items: async () => {
    const items = await Item.find({});
    return items;
  },
  item: async (obj, args, context, info) => {
    const item = await Item.findById(args.id); //with id
    return item;
  }
};

module.exports = Query;
