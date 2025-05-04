import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwtUtils.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      passwordHash,
    });

    await newUser.save();

    const token = signToken(newUser._id, newUser.email);

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid credentials" });
    }

    const token = signToken(user._id, user.email);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-passwordHash");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("favorites");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addFavorite = async (req, res) => {
  const userId = req.userId;
  const { cca3, name, flag } = req.body;

  try {
    if (!cca3 || !name || !flag) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingFavorite = user.favorites.find((fav) => fav.cca3 === cca3);
    if (existingFavorite) {
      return res
        .status(400)
        .json({ success: false, message: "Country already in favorites" });
    }

    user.favorites.push({ cca3, name, flag });
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Country added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeFavorite = async (req, res) => {
  const userId = req.userId;
  const { cca3 } = req.params;

  try {
    if (!cca3) {
      return res
        .status(400)
        .json({ success: false, message: "Country code is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const favoriteIndex = user.favorites.findIndex((fav) => fav.cca3 === cca3);
    if (favoriteIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Country not found in favorites" });
    }

    user.favorites.splice(favoriteIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Country removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: true, message: "Server error" });
  }
};
