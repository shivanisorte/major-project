const verifyToken = require("../utils/verifyToken");
function verificationMiddleware(req, res, next) {
  const cookieString = req.headers.cookie
    ? req.headers.cookie.split("=")[1]
    : null;
  console.log("is this hitting?");
  const user = cookieString != null ? verifyToken(cookieString) : false;
  if (user !== false) {
    req.user = user;
    next();
  } else {
    // res.status(302).redirect(`http://localhost:3000/`); //redirect to landing page if no token in cookie
    res.status(404).json({ success: false });
  }
}
module.exports = verificationMiddleware;
