import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"


export const tokenHandler = async(token)=>{
    try {
        if(!token){
            return {
                message:"session logged out",
                logout:true
            }
        }
        const  decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    
        const user = await UserModel.findById(decode.id).select('-password')
    
        return user;
    } catch (error) {
        return error;
    }
}