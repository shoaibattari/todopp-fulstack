import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  const { name, email, password, userRole } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "please provide all fields",
      status: false,
    });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User with same email already exists",
      status: false,
    });
  }
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      userRole: userRole || "user",
    });
    res.status(200).json({
      message: "User Create Succesfully",
      status: "true",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password, userRole } = req.body;
  if (!userRole || !email || !password) {
    return res.status(400).json({
      message: "please provide all fields",
      status: false,
    });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log("🚀 ~ loginUser ~ user:", user);
      return res.status(401).json({
        message: "No User with email",
        status: false,
      });
    }
    if (user.userRole !== userRole) {
      return res.status(403).json({
        message: "No User Role Match",
        status: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
        status: false,
      });
    }
    const token = user.getSignedToken();
    const userData = user._doc;

    res.status(200).json({
      message: "Login Successfull",
      status: true,
      token,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({
        message: "User Not Found",
        status: false,
      });
    }

    res.status(203).json({
      message: "User Profile Fetch Succesfully",
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "All users fetched successfully",
      status: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
