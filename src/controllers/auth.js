const authService = require("../services/auth");
const ErrorBuilder = require("../utils/builder/error");
const ResponseBuilder = require("../utils/builder/response");

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      throw new ErrorBuilder("Email and password are required.");
    }
    const token = await authService.loginUser(req.body);
    // Return success response with token
    res.json(new ResponseBuilder({ token }, "Login successful."));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginUser: loginUser,
};
