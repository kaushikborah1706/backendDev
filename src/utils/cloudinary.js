import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET ,
});

const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath)return null
        //upload the file on Cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        //Till here file has been uploaded successfully
        // console.log("file has been succesfully uploaded",response.url);
        // fs.unlink(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //removes the locally saved temporary files as the upload operation got fallied
        return null;
    }
}
export default uploadOnCloudinary;