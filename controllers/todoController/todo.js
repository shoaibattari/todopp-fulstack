import TodoModel from "../../models/todo.model.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "please provide all fields",
        status: false,
        data: null,
      });
    }
    const newTodo = await TodoModel.create({
      title,
      description,
    });
    res.status(200).json({
      message: "Todo Add Succesfully",
      status: "true",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const allTodos = await TodoModel.find({});
    if (!allTodos) {
      return res.status(400).json({
        message: "Todo Not Found",
        status: false,
        data: null,
      });
    }
    res.status(200).json({
      message: "succesfully all todos fetch",
      status: true,
      data: allTodos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params.id);
    const Todo = await TodoModel.findOne({ _id: id });
    console.log(`single todo byid  ${Todo}`);
    if (!Todo) {
      return res.status(400).json({
        message: "Todo Not Found",
        status: false,
        data: null,
      });
    }
    res.status(200).json({
      message: "succesfully todo fetch",
      status: true,
      data: Todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.params.id);
    const findTodo = await TodoModel.findOne({ _id: id });
    if (!findTodo) {
      return res.status(400).json({
        message: "Todo Not Found",
        status: false,
        data: null,
      });
    }
    console.log(`single todo byid  ${findTodo}`);
    findTodo.title = title || findTodo.title;
    findTodo.description = description || findTodo.description;
    await findTodo.save();
    res.status(200).json({
      message: "succesfully todo updated",
      status: true,
      data: findTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params.id);
    const Todo = await TodoModel.deleteOne({ _id: id });
    console.log(`single todo byid  ${Todo}`);
    if (!Todo) {
      return res.status(400).json({
        message: "Todo Not Found",
        status: false,
        data: null,
      });
    }
    res.status(200).json({
      message: "succesfully todo delete",
      status: true,
      data: Todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const deleteAllTodos = async (req, res) => {
  try {
    const Todos = await TodoModel.deleteMany();
    console.log(`delete todos  ${Todos}`);
    if (!Todos) {
      return res.status(400).json({
        message: "Todo Not Found",
        status: false,
        data: null,
      });
    }
    res.status(200).json({
      message: "succesfully todos delete",
      status: true,
      data: Todos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};
