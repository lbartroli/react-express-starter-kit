import express from "express";
import UserModel from "../models/user";
let router = express.Router();

const UsersController = () => {

    router.get('/', (req, res) => {
        res.json({message: 'Hello from express!'})
    });

    router.get('/getUsers', async (req, res) => {
        let users = await UserModel.find();
        res.json({users: users});
    });

    router.post('/addUser', (req, res) => {
        let user = req.body.user;
        let newUser = new UserModel(user);
        newUser.save(err => {
            if(err) throw err;

            res.json({success: true, newUser: newUser});
        })
    });

    return router;
}

export default UsersController;