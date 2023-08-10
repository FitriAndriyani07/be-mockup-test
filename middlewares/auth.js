const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  auth: async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.sendStatus(401);
      }

      const data = jwt.verify(authorization, JWT_SECRET_KEY);
      req.user = {
        id: data.id,
        name: data.name
      };
      next();
    } catch (error) {
      throw error;
    }
  }
};