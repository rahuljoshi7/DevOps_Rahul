const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/users");

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) return res.json({ error: "You must be logged in" });
    token = token.replace("Bearer ", "");
    const decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    return res.json({ error: "You must be logged in" });
  }
};

exports.isAuth = (req, res, next) => {
  const { loggedInUserId } = req.body;
  if (!loggedInUserId || !req.userDetails._id || loggedInUserId != req.userDetails._id) {
    return res.status(403).json({ error: "You are not authenticated" });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  try {
    const reqUser = await userModel.findById(req.body.loggedInUserId);
    if (!reqUser || reqUser.userRole === 0) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
