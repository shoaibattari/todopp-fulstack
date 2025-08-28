import cloudinary from "../../config/cloudinary.js";
import TaskifyModel from "../../models/taskifyModel.js";
import User from "../../models/userModel.js";

// Add Taskify
export const addTaskify = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Please provide all fields",
        status: false,
        data: null,
      });
    }

    const avatar = {
      url: req.file?.path || "",
      publicId: req.file?.filename || "",
    };

    const newTask = await TaskifyModel.create({
      title,
      description,
      user: req.user.id,
      avatar,
    });

    res.status(200).json({
      message: "Taskify added successfully",
      status: true,
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// Get All Taskify for logged-in user
export const getAllTaskify = async (req, res) => {
  try {
    const tasks = await TaskifyModel.find({ user: req.user.id });
    res.status(200).json({
      message: "Successfully fetched all taskify",
      status: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// Get Single Taskify
export const getTaskify = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskifyModel.findOne({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        message: "Taskify not found",
        status: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "Successfully fetched taskify",
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// Edit Taskify
export const editTaskify = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await TaskifyModel.findOne({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        message: "Taskify not found",
        status: false,
        data: null,
      });
    }

    if (req.file && task.avatar.publicId) {
      await cloudinary.uploader.destroy(task.avatar.publicId);
    }

    task.title = title || task.title;
    task.description = description || task.description;

    if (req.file) {
      task.avatar = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await task.save();

    res.status(200).json({
      message: "Taskify updated successfully",
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// Delete Single Taskify
export const deleteTaskify = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskifyModel.deleteOne({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        message: "Taskify not found",
        status: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "Taskify deleted successfully",
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// Delete All Taskify for User
export const deleteAllTaskify = async (req, res) => {
  try {
    const tasks = await TaskifyModel.deleteMany({ user: req.user.id });
    res.status(200).json({
      message: "All taskify deleted successfully",
      status: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// Admin: Delete All Taskify
export const adminDeleteAllTaskify = async (req, res) => {
  try {
    const tasks = await TaskifyModel.deleteMany();
    res.status(200).json({
      message: "Admin: All taskify deleted",
      status: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// Admin: Get All Taskify for all users
export const getAllTaskifyForAdmin = async (req, res) => {
  try {
    const tasks = await TaskifyModel.find()
      .populate("user", "name email userRole")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Admin: All taskify fetched successfully",
      status: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

// ✅ Public Controller for Landing Page
export const getAllTaskifyForLanding = async (req, res) => {
  try {
    const taskifyList = await TaskifyModel.find();
    res.status(200).json({
      success: true,
      data: taskifyList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch taskify for landing page",
      error: error.message,
    });
  }
};

// Get Single Taskify
export const getaAdminTaskify = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskifyModel.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({
        message: "Taskify not found",
        status: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "Successfully fetched taskify",
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// admin Edit
export const adminEditTaskify = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await TaskifyModel.findOne({ _id: id });
    console.log("🚀 ~ adminEditTaskify ~ task:", task)

    if (!task) {
      return res.status(404).json({
        message: "Taskify not found",
        status: false,
        data: null,
      });
    }

    if (req.file && task.avatar.publicId) {
      await cloudinary.uploader.destroy(task.avatar.publicId);
    }

    task.title = title || task.title;
    task.description = description || task.description;

    if (req.file) {
      task.avatar = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await task.save();

    res.status(200).json({
      message: "Taskify updated successfully",
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // ✅ Total Users
    const totalUsers = await User.countDocuments();

    // ✅ Total Taskify
    const totalTaskify = await TaskifyModel.countDocuments();

    // ✅ Users by Role
    const usersByRole = await User.aggregate([
      { $group: { _id: "$userRole", count: { $sum: 1 } } },
    ]);

    // ✅ Recent Users (last 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email userRole createdAt");

    // ✅ Recent Taskify (last 5)
    const recentTaskify = await TaskifyModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title description status createdAt");

    res.status(200).json({
      message: "Admin Dashboard Stats",
      status: true,
      data: {
        totalUsers,
        totalTaskify,
        usersByRole,
        recentUsers,
        recentTaskify,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};
