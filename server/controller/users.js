const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class User {
  async getAllUser(req, res) {
    try {
      const Users = await userModel.find({}).sort({ _id: -1 });
      return res.json({ Users });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getSingleUser(req, res) {
    const { uId } = req.body;
    if (!uId) return res.json({ error: "All fields are required" });
    try {
      const User = await userModel
        .findById(uId)
        .select("name email phoneNumber userImage updatedAt createdAt");
      if (User) return res.json({ User });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postEditUser(req, res) {
    const { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ error: "All fields are required" });
    }
    try {
      await userModel.findByIdAndUpdate(uId, { name, phoneNumber, updatedAt: Date.now() });
      return res.json({ success: "Profile updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async changePassword(req, res) {
    const { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ error: "All fields are required" });
    }
    try {
      const data = await userModel.findById(uId);
      if (!data) return res.json({ error: "Invalid user" });

      const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
      if (!oldPassCheck) return res.json({ error: "Your old password is incorrect" });

      const hashed = bcrypt.hashSync(newPassword, 10);
      await userModel.findByIdAndUpdate(uId, { password: hashed });
      return res.json({ success: "Password updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

const usersController = new User();
module.exports = usersController;
