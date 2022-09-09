const User = require("../models/userModel");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find();
      res.status(200).json(allUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
