import mongoose from "mongoose";
const MONGODB_URL = process.env.mongodb_uri

const ConnectToDB=async ()=>{
    const db = await mongoose.connect(MONGODB_URL)
    return db
}
export default ConnectToDB;
