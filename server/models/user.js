import mongoose from "mongoose";
let Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
    username: String,
    password: String,
    isAdmin: Boolean
}));