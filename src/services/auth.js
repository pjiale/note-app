const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user");
const ErrorBuilder = require("../utils/builder/error");

async function loginUser(body) {
  const { email, password } = body;
  // Find user by email
  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new ErrorBuilder("Invalid credentials.", 404);
  }

  // Compare password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ErrorBuilder("Invalid credentials.", 404);
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "1h" } // Token expiration time
  );
  return token;
}

module.exports = {
  loginUser,
};
