const { User } = require("../models");

class UserRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    console.log("user-repository");
    const response = await User.create(data);
    console.log("user-repository", response);
    return response;
  }
  async getUserByEmail(email) {
    const response = await User.findOne({ where: { email: email } });
    return response;
  }
  async getUserByUsername(username) {
    const response = await User.findOne({ where: { username: username } });
    return response;
  }

  async get(id) {
    const response = await User.findByPk(id);
    return response;
  }
}

module.exports = UserRepository;
