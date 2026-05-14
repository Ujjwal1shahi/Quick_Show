import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";

const generateToken = (userId) => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Sign Up
export const signup = async (req, res) => {
  try {
    const { name, email, password, image, role } = req.body;

    if(!name || !email || !password){
      return res.status(400).json({
        success: false,
        message: "Name, email and password is required",
      });
    }

    if(password.length < 6){
      return res.status(400).json({
        success: false,
        message: "Password must be of at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image || "",
      role: role || "user",
    });
    
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "SignUp Successfull",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("SignUp Error : ", error);
    res.status(500).json({
      success: false,
      message: "server error during signup",
    });
  }
};

// Login
export const login = async (req, res) => {
  try {

    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if(!user){
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Login Successfull",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Login Error : ", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};