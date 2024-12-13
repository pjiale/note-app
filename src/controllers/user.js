const userService = require("../services/user");
const ErrorBuilder = require("../utils/builder/error");
const ResponseBuilder = require("../utils/builder/response");

async function registerUser(req, res, next) {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      throw new ErrorBuilder("Email and password are required.");
    }
    const user = await userService.registerUser(req.body);
    // Remove credential
    delete user.password;
    // Return success response
    res.json(
      new ResponseBuilder({ user }, "User registered successfully.", 201)
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
};
