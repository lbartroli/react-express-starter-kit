import express from "express";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";
let router = express.Router();

const AuthenticationController = (app) => {
    router.post("/authenticate", async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let user = await UserModel.findOne({ username: username });

        if (!user) {
            res.json({
                success: false,
                message: "Authentication failed. User not found."
            });
        } else if (user) {
            if (user.password != password) {
                res.json({
                    success: false,
                    message: "Authentication failed. Wrong password."
                });
            } else {
                const payload = {
                    isAdmin: user.isAdmin,
                    username: user.username
                };
                let token = jwt.sign(payload, app.get("superSecret"), {
                    expiresIn : 60 * 60 * 24 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: "Enjoy your token!",
                    token: token
                });
            }
        }
    });

    return router;
};

export default AuthenticationController;
