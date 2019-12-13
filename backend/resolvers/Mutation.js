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
  }
};

module.exports = Mutation;

// i was not getting back a saved item but
