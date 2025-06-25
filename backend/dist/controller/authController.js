"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err.message || err);
        res.status(500).json({ message: "Something went wrong", error: err.message || err });
    }
};
exports.login = login;
const googleAuth = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload?.email;
        const username = payload?.name || email?.split('@')[0];
        let user = await User_1.default.findOne({ email });
        if (!user) {
            user = new User_1.default({
                email,
                username,
                password: '',
            });
            await user.save();
        }
        const jwtToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'supersecretstring', {
            expiresIn: '7d',
        });
        res.status(200).json({
            message: 'Google login successful',
            token: jwtToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({
            message: 'Something went wrong with Google login',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.googleAuth = googleAuth;
