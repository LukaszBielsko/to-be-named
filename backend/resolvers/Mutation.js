const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../mongo/schema');

const { Item } = db;
const { User } = db;

const Mutation = {
  createItem: async (parent, args, ctx, info) => {
    const item = new Item({
      title: args.title,
      place: args.place,
      description: args.description,
      image: args.image,
      largeImage: args.largeImage,
    });
    await item.save((err, savedItem) => {
      if (err) return console.error('error', err);
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
    // 1. find the item
    /* TODO  2. check if user owns it and has permissions  */
    // 3. delete it

    const item = await Item.findById(args.id);

    Item.deleteOne({ _id: args.id }, () => {
      console.log(`Item ${args.id} --- DELETED`);
    });

    return item;
  },

  signUp: async (parent, args, ctx, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = new User({
      ...args,
      password,
    });
    await user.save();
    // create jwtToken
    const jwtToken = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    // send token as a cookie
    ctx.response.cookie('jwtToken', jwtToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    return user;
  },

  signIn: async (parent, { email, password }, ctx, info) => {
    const user = await User.findOne({ email });
    console.log('user password', user.password);
    if (!user) {
      throw new Error('User not found.');
    }
    await bcrypt.compare(password, user.password, (error, isMatch) => {
      console.log('isMatch', isMatch);
      console.log('err', error);
      if (isMatch) {
        console.log("yey, we've got a user");
      }
    });
    return user;
  },
};

module.exports = Mutation;

// const res = await Character.remove({ name: 'Eddard Stark' });
// res.deletedCount; // Number of documents removed
