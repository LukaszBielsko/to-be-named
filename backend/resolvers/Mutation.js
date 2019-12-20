const Item = require("../mongo/schema");

const Mutation = {
  createItem: async (parent, args, ctx, info) => {
    const item = new Item({
      title: args.title,
      place: args.place,
      description: args.description,
      image: args.image,
      largeImage: args.largeImage
    });
    console.log(item);
    const saved = await item.save((err, savedItem) => {
      if (err) return console.error("error", err);
    });
    return item;
  },
  updateItem: async (parent, args, ctx, info) => {
    const item = await Item.findById(args.id);
    item.title = args.title || item.title;
    item.place = args.place || item.place;
    item.description = args.description || item.description;
    item.save();
    return item;
  },
  deleteItem: async (parent, args, ctx, info) => {
    const item = await Item.findById(args.id);
    console.log("\n\n ITEM \n\n", item);
    const res = Item.deleteOne({ _id: args.id }, () => {
      console.log("\n\n DELETE ITEM \n\n", res);
    });
  }
};

module.exports = Mutation;

// const res = await Character.remove({ name: 'Eddard Stark' });
// res.deletedCount; // Number of documents removed
