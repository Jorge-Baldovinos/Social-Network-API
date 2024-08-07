const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const friendCount = async () => {
    const numberOfFriends = await friends.aggregate()
    .count('friendCount');
    return numberOfFriends;
}

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            
            res.json(users);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },
    // Get a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!student) {
                return res.status(404).json({ message: 'No student with that ID' })
            }

            res.Json({
                user,
                thought: await thought(req.params.userId), // thought function?
                friend: await friendCount(req.params.userId),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Add a new user (using username and email)
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update username
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove(
                { _id: req.params.userId }
            );

            if (!user) {
                return res.status(404).json({ message: 'No video with this id!' });
            }

            const thought = Thought.findOneAndRemove(
                { users: req.params.userId },
                { $pull: { users: req.params.videoId } },
                { new: true }
            );
            
            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    async addNewFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
              );
        
              if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
              }
        
              res.json(user);
            } catch (err) {
                res.status(500).json(err);
              }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
              )
        
              if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
              }
        
              res.json(user);  
        } catch (err) {
            res.status(500).json(err);
          }
    }
};