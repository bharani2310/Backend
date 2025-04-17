import jwt from "jsonwebtoken";
import { sendEmailVerification } from "./support.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const otpStorage = [];

export const updateUser = async (req, res) => {
  const { id } = req.params;
  // console.log("User",id)
  const { name, dob, gender } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;

    await user.save();
    res.json(user);
  } catch (error) {
    // console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const resOtp = await sendEmailVerification(email);
    if (typeof resOtp === "number") {
      const existingIndex = otpStorage.findIndex(entry => entry.email === email);

      if (existingIndex !== -1) otpStorage[existingIndex].otp = resOtp;
      else otpStorage.push({ email, res: resOtp });
    }

    res.status(200).json({
      message: "OTP sent successfully",
      success: true
    });
  } catch (error) {
    // console.log("error ", error);
    res.status(500).json({ message: error.message || error, error: true });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOtp = otpStorage.find(entry => entry.email === email);

    if (!storedOtp) {
      return res.status(404).json({ message: "Invalid, Try once again", success: false });
    }

    if (storedOtp.res !== otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    otpStorage.splice(otpStorage.indexOf(storedOtp), 1);
    res.status(200).json({ message: "Email verified successfully", success: true });
  } catch (error) {
    // console.log("error ", error);
    res.status(500).json({ message: error.message || error, error: true });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { data } = req.body;
    const { name, email, dob, gender, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", error: true });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, dob, gender, password: hashedPassword });
    const savedUser = await user.save();

    res.status(200).json({
      message: "User registered successfully",
      data: savedUser,
      success: true
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message || error, error: true });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { data } = req.body;
    const { email, password } = data;
    // console.log("email",email)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist", error: true });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password", error: true });
    }

    const tokenData = { id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login Successful",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          dob: user.dob,
          gender: user.gender,
          role: user.role
        },
        token,
        success: true
      });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ message: error.message || "Server Error", error: true });
  } 
};

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ message: "User count retrieved successfully", count, success: true });
  } catch (error) {
    // console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
};
