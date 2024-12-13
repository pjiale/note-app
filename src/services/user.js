const bcrypt = require("bcrypt");
const User = require("../models/user");
const ErrorBuilder = require("../utils/builder/error");

async function registerUser(body) {
  const { email, password } = body;
  // Check if email already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ErrorBuilder("Email is already registered.");
  }

  // Create a new user
  const user = await createUser({ email, password });
  return user;
}

async function findUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function createUser({ username, email, password }) {
  const hashedPassword = await hashPassword(password);
  return await User.create({
    username,
    email,
    password: hashedPassword,
  });
}

module.exports = {
  registerUser: registerUser,
  findUserByEmail: findUserByEmail,
  hashPassword: hashPassword,
  createUser: createUser,
};
