const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../config");
const { UserRepository } = require("../repositories");
const serverConfig = require("../config/server-config");

const userRepository = new UserRepository();

async function signup(data) {
  try {
    console.log("user-service");
    const user = await userRepository.create(data);
    console.log("user-service", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }
    const userPasswordMatch = bcrypt.compareSync(data.password, user.password);
    if (!userPasswordMatch) {
      throw new Error("Password dosn't match");
    }
    const jwtToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      ServerConfig.JWT_SECRET,
      { expiresIn: serverConfig.JWT_EXPIRY }
    );
    return jwtToken;
  } catch (error) {
    throw error;
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new Error("Missing JWT Token");
    }
    const response = jwt.verify(token, ServerConfig.JWT_SECRET);
    console.log(response)
    const user = await userRepository.get(response.id);
    if (!user) {
      throw new Error("User not found");
    }
    console.log(user.id)
    return user.id;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(data) {
  try {
    const user = await userRepository.getUserByUsername(data.username);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signup,
  signin,
  getUserByEmail,
  getUserByUsername,
  isAuthenticated,
};
