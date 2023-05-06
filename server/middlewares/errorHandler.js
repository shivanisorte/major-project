const errorCodes = require("../utils/error-codes");

function errorHandler(err, req, res, next) {
    const code = (err && err.code) || null;
    const error = errorCodes[code] || errorCodes['INTERNAL_ERROR'];
  
    return res
      .status(error.statusCode)
      .json({ 
        success: false,
        statusCode: error.statusCode,
        message: error.message,
      });
};
  
module.exports = errorHandler;