const connection = require('../config/connection');
const mongoose = require('mongoose');
const { User, Thought } = require('../models');

const thoughtData = await Thought.create(thoughts);
const userData = await User.create(users);

const seedThought = [
  {
    thoughtText: 'Nice job today!',
    username: 'steveJ',
  }
];

const seedUser = [
  {
    username: 'steveJ',
    email: 'steveJ@gmail.com',
    thoughts: [...thoughtData.map(({_id}) => _id)],
    friends: [...userData.map(({_id}) => _id)]

  }
];

const seedDB = async () => {
  await User.insertMany(seedUser);
  await Thought.insertMany(seedThought);
};


