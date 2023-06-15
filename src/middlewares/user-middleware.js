const { UserService } = require("../services");

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );

    if(!response){
        console.log("x-access-token : Error")
    }
    if (response) {
      req.user = response;
      next();
    }
  } catch (error) {
    return res.status(404).json(error);
  }
}

module.exports = {
  checkAuth,
};
