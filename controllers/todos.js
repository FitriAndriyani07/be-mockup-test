const { Todos, Users } = require('../models');

module.exports = {
  index: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          status: false,
          message: 'id is required.',
          data: null
        });
      }

      const todo = await Todos.findOne({where: {id}});
      if (!todo) {
        return res.status(404).json({
          status: false,
          message: `Todo with id ${id} is not found`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'success',
        data: todo
      });
    } catch (err) {
      next(err);
    }
  },

  show: async (req, res, next) => {
    try {
      // get all todos by user_id
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          status: false,
          message: 'id is required.',
          data: null
        });
      }

      const user = await Users.findOne({where: {id}});
      if (!user) {
        return res.status(404).json({
          status: false,
          message: `User with id ${user_id} is not found`,
          data: null
        });
      }

      const todos = await Todos.findAll({where: {user_id: id}});

      if (todos.length < 1) {
        return res.status(404).json({
          status: false,
          message: 'todos is still empty.',
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'success',
        data: todos
      });
    } catch (err) {
      next(err);
    }
  },

  store: async (req, res, next) => {
    try {
      const { user_id, todo, deadline } = req.body;

      if (!user_id || !todo) {
        return res.status(400).json({
          status: false,
          message: 'All field are required.',
          data: null
        });
      }

      const user = await Users.findOne({where: {id: user_id}});

      if (!user) {
        return res.status(404).json({
          status: false,
          message: `User with id ${user_id} is not found.`,
          data: null
        });
      }

      const todoData = await Todos.create({ user_id, todo, deadline, is_done: false });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: todoData
      });
    } catch (error) {
      next(error);
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id } = req.body;

      const todo = await Todos.findOne({where: {id}});
      if (!todo) {
        return res.status(404).json({
          status: false,
          message: `Todo with id ${id} is not found`,
          data: null
        });
      }

      await Todos.update(req.body, {where: {id}});

      return res.status(200).json({
        status: true,
        message: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const todo = await Todos.findOne({where: {id}});
      if (!todo) {
        return res.status(404).json({
          status: false,
          message: `Todo with id ${id} is not found`,
          data: null
        });
      }

      await Todos.destroy({where: {id}});

      return res.status(200).json({
        status: true,
        message: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  }
}