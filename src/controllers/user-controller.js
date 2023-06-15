const bcrypt = require("bcrypt");
const { User } = require("../models");
const { UserService } = require("../services");

const signup = async (req, res) => {
  try {
    console.log("controller");
    const { username, email, password } = req.body;
    const userByEmail = await UserService.getUserByEmail({ email: email });
    const userByUsername = await UserService.getUserByUsername({
      username: username,
    });
    if (userByEmail) {
      return res.status(409).json({
        success: false,
        message: "User already exists with email",
        data: {},
        error: {},
      });
    }
    if (userByUsername) {
      return res.status(409).json({
        success: false,
        message: "User already exists with username",
        data: {},
        error: {},
      });
    }

    const user = await UserService.signup({
      username: username,
      email: email,
      password: password,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully created an user",
      data: user,
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to created User",
      data: {},
      error: {},
    });
  }
};

async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.signin({ email, password });
    return res.status(202).json({
      success: true,
      message: `Successfully Logged In User : ${user.username}`,
      data: user,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Login",
      data: {},
      error: error.message,
    });
  }
}

const users = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const users = await User.findAll();

    const filteredData = users.map(({ id, username, createdAt }) => {
      return { id, username, createdAt };
    });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched all data",
      users: filteredData,
      error: {},
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Failed fetch data",
      users: {},
      error: error,
    });
  }
};

module.exports = {
  signin,
  signup,
  users,
};
