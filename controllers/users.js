const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const keyGenerator = require('otp-generator');

module.exports = {
  register: async (req, res, next) => {
    try {      
      const { name } = req.body;
      const login_key = keyGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      if (!name) {
        return res.status(400).json({
          status: true,
          message: 'Name is required.',
          data: null
        });
      }
  
      await Users.create({name, login_key});
  
      return res.status(200).json({
        status: true,
        message: 'success',
        data: {
          name,
          login_key
        }
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {      
      const { login_key } = req.body;
  
      if (!login_key || login_key.length < 4) {
        return res.status(400).json({
          status: false,
          message: 'login_key is invalid.',
          data: null
        })
      }
  
      const user = await Users.findOne({where: {login_key}});
  
      if (!user) {
        return res.status(400).json({
          status: false,
          message: 'login failed.',
          data: null
        })
      }
  
      const payload = {
        id: user.id,
        name: user.name,
      };
  
      const token = await jwt.sign(payload, JWT_SECRET_KEY);
  
      return res.status(200).json({
        status: true,
        message: 'success',
        data: {
          user_id: user.id,
          name: user.name,
          token: token
        }
      });
    } catch (error) {
      next(error);
    }
  }
}