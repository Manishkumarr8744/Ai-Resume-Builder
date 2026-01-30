import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import Resume from "../Models/resumeModel.js";

//POST to /api/users/register  [Register User Function]
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      res.status(400).json({ message: "Missing Required Field" });
    }

    const user = await User.findOne({ email });
    if (user && user.length > 0) {
      res.status(400).json({ message: "User Exists already" });
    }

    //creating new User
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created Successfully", token, user: newUser });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error has been occured ${err.message}` });
  }
};

//get to /api/users/login  [Login User Function]
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({ message: "Missing email or password" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    user.password = undefined;
    const token = await generateToken(user._id);
    res
      .status(201)
      .json({ message: "logged-in sucessfully", token, User: user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

//get user data /api/user/:userId [get User data by id]
export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = undefined;
    return res.status(201).json({ message: "User found", User: user });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

// controller for get user resume
// Get /api/users/resume
export const getUserResume = async (req, res) => {
  try {
    const userId = req.userId;

    const resume = await Resume.find({ userId });

    if (!resume) {
      return res.status(401).json({ message: "No Resume found" });
    }
    return res.status(201).json({ message: "Resume Found", resume });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
