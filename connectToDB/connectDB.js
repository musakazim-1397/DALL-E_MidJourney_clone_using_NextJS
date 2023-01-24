import mongoose from "mongoose";
const MONGODB_URL = process.env.mongodb_uri

const ConnectToDB=async ()=>{
     return mongoose.connect(MONGODB_URL)
}
export default ConnectToDB;
