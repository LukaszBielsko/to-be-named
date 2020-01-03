const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
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
    await item.save(err => {
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
    // create token
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    // send token as a cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    return user;
  },

  signIn: async (parent, { email, password }, ctx, info) => {
    const user = await User.findOne({ email });
    // console.log('user password', user.password);
    if (!user) {
      throw new Error('User not found.');
    }
    // await bcrypt.compare(password, user.password, (error, isMatch) => {
    //   console.log('isMatch', isMatch);
    //   console.log('err', error);
    //   if (isMatch) {
    //     const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //     ctx.response.cookie('token', token, {
    //       httpOnly: true,
    //       maxAge: 1000 * 60 * 60 * 24 * 365,
    //     });
    //   }
    // });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },
  signOut: (parent, args, ctx, info) => {
    console.log('ctx from mutation', ctx);
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  requestPasswordReset: async (parent, { email }, ctx, info) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found.');
    }
    const randomBytesPromise = promisify(randomBytes);
    // do you see the clever thing below?
    // (await functionToAwait).chainedFunction()
    const resetToken = (await randomBytesPromise(20)).toString('hex');
    user.resetToken = resetToken;
    user.save();
    return { message: 'Password reset request successfull' };
    /* TODO sent the password change email */
  },
};

module.exports = Mutation;

// const res = await Character.remove({ name: 'Eddard Stark' });
// res.deletedCount; // Number of documents removed
