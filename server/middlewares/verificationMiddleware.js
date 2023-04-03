const verifyToken = require("../utils/verifyToken");
function verificationMiddleware(req, res, next) {
  const cookieString = req.headers.cookie
    ? req.headers.cookie.split("=")[1]
    : null;
  console.log("cookiesSeToken-", cookieString);
  if (cookieString && verifyToken(cookieString)) {
    next();
  } else {
    res.redirect(`http://localhost:3000/`); //redirect to landing page if no token in cookie
  }
}
module.exports = verificationMiddleware;
