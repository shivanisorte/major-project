module.exports = {
    INVALID_EMAIL_OR_PASSWORD: {
      statusCode: 400, // Bad Request
      message: 'Invalid email address or password',
    },
    INVALID_TOKEN: {
        statusCode: 401, // Unauthorized
        message: 'Invalid Token',
    },
    EMAIL_ALREADY_EXISTS: {
        statusCode: 409, // Conflict
        message: 'Email already exists',
    },
    USER_NOT_FOUND: {
      statusCode: 404, // Not Found
      message: 'User not found',
    },
    COORDINATOR_NOT_FOUND: {
        statusCode: 404, // Not Found
        message: 'Coordinator not found',
    },
    INTERNAL_ERROR: {
      statusCode: 500, // Internal Server Error
      message: 'Internal Server Error',
    },
    UNAUTHORIZED: {
        statusCode: 401, // Unauthorized
        message: 'Unauthorized',
    },
    VERIFICATION_FAILED: {
        statusCode: 401, // Unauthorized
        message: 'Verification Failed',
    },
    FORBIDDEN: {
        statusCode: 403, // Forbidden
        message: 'Forbidden',
    },
    UNPROCESSABLE_ENTITY: {
        statusCode: 422, // Unprocessable Entity
        message: 'Unprocessable Entity',
    },
    TOO_MANY_REQUESTS: {
        statusCode: 429, // Too Many Requests
        message: 'Too Many Requests',
    },
    GATEWAY_TIMEOUT: {
        statusCode: 504, // Gateway Timeout
        message: 'Gateway Timeout',
    },
    SERVICE_UNAVAILABLE: {
        statusCode: 503, // Service Unavailable
        message: 'Service Unavailable',
    },
    BAD_GATEWAY: {
        statusCode: 502, // Bad Gateway
        message: 'Bad Gateway',
    },    
  };