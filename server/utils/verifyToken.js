require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    if (decoded) return decoded.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = verifyToken;
