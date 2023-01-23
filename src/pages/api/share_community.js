import User from "models/User";
import ConnectToDB from "connectToDB/connectDB";
import { v2 as cloudinary } from 'cloudinary';


const handler =async (req,res)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    console.log('cloudinary handler triggered');
    const { name, prompt, photo } = req.body;
    try {
        const photoUrl = await cloudinary.uploader.upload(`data:image/png;base64,`+photo);
   
        const db = await ConnectToDB();
        const existingUser = await db.findOne({name:name})
        if (existingUser){
            await User.imageUrls.push(photoUrl)
            await User.prompts.push(prompt)
            await User.save()
        }
        const newPost = await User.create({
            name:name,
            imageUrls:  photoUrl
          });
      
          res.status(200).json({ success: true, data: newPost });
    }
    catch(err){
    console.log(err || 'error connecting to database');
    }

}
export default handler;