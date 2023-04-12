require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;
const createToken = (phno) => {
  return jwt.sign(
    {
      data: phno,
    },
    secret,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = createToken;
