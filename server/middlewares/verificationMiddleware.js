const verifyToken = require("../utils/verifyToken");
function verificationMiddleware(req, res, next) {

  const token = req.headers.cookie
  ? req.headers.cookie.split(";").find(cookie => cookie.trim().startsWith("token="))
  : null;

  const cookieString = token ? token.split("=")[1] : null;

  const user = cookieString != null ? verifyToken(cookieString) : false;
  if (user !== false) {
    req.user = user;
    next();
  } else {
    // res.status(302).redirect(`http://localhost:3000/`); //redirect to landing page if no token in cookie
    res.status(404).json({ success: false, error: "Unauthorized Access" });
  }
}
module.exports = verificationMiddleware;
