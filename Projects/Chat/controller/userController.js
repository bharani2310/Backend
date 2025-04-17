import  UserModel  from "../models/UserModel.js";
import { ConversationModel } from '../models/ConversationModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { tokenHandler } from "../utils/tokenHandler.js";
import { onlineUser } from "../utils/socket.js";

export const registerUser=async(request,response)=>{
    // console.log("registring user")
    try {
        const {name,email,password,profile_pic}=request.body;
        const checkEmail=await UserModel.findOne({email})
        if(checkEmail){
            return response.status(400).json({
                message:"User already exists",
                error:true
            })
        }

        //Hashing the Password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const payload={
            name,
            email,
            profile_pic,
            password:hashedPassword
        }

        const user = new UserModel(payload)
        const saveUser=await user.save()

        return response.status(200).json({
            message:"User registered successfully",
            data:saveUser,
            success:true
        })

    } catch (error) {
        return response.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}

export const checkEmail=async(request,response)=>{
    try {
        const {email}=request.body
        const checkEmail=await UserModel.findOne({email}).select("-password")
        if(!checkEmail){
            return response.status(404).json({
                message:"User not exist",
                error:true
            })
        }
        return response.status(200).json({
            message:"Email verified",
            data:checkEmail,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

export const checkPassword = async(request,response)=>{
    try {
        const {password,userId}=request.body
        const user=await UserModel.findOne({_id:userId})
        const verifyPassword=await bcrypt.compare(password,user.password)
        if(!verifyPassword){
            return response.status(400).json({
                message:"Invalid Password",
                error:true
            })
        }

        const tokenData = {
            id: user._id,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

        const cookieOption = {
            http:true,
            secure:true
        }

        return response.cookie('token',token,cookieOption).status(200).json({
            message:"Login Successfull",
            data:user,
            token:token,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

export const userDetails=async(request,response)=>{
    try {
        const token=request.cookies.token || ""
        const user = await tokenHandler(token)

        return response.status(200).json({
            message:"User Details",
            data:user,
            success:true
        });
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const userDetails = await UserModel.findById(userId).select('-password');

        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isOnline = onlineUser.has(userId);

        return res.status(200).json({ 
            success: true, 
            data: { 
                ...userDetails.toObject(), 
                online: isOnline 
            } 
        });
    } catch (error) {
        // console.error("Error fetching user details:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getMessage = async (request, response) => {
    try {
      const { sender, receiver } = request.query;
  
      if (!sender || !receiver) {
        return response.status(400).json({
          message: "Sender and receiver IDs are required.",
          error: true,
        });
      }
  
      const getConversationMessage = await ConversationModel.findOne({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      }).populate({
        path: "messages",
        options: { sort: { createdAt: 1 } }, 
      });
  
      if (!getConversationMessage) {
        return response.status(200).json({
          message: [],
          success: true,
        });
      }
    
      return response.status(200).json({
        message: getConversationMessage.messages,
        success: true,
      });
    } catch (error) {
    //   console.error("Error retrieving messages:", error);
      return response.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
      });
    }
  };

  export const getConversation = async(currentUserId) => {
        if(currentUserId){
            const currentUserConversation = await ConversationModel.find({
                "$or" : [
                    {sender:currentUserId},
                    {receiver:currentUserId}
                ]
            }).sort({updatedAt:-1}).populate('messages').populate('sender').populate('receiver')
        
            // console.log("currentUserConversation",currentUserConversation)
        
            const conversation = currentUserConversation.map((conv)=>{
                const countUnseenMessage = conv.messages.reduce((prev,curr)=>{
                    const mess = curr?.msgByUserId?.toString()
                    if(mess!== currentUserId){
                        return prev+(curr.seen?0:1)
                    }
                    else{
                        return prev
                    }
                },0)
                return{
                    _id:conv?._id,
                    sender:conv?.sender,
                    receiver:conv?.receiver,
                    unseenMsg:countUnseenMessage,
                    lastMsg:conv.messages[conv?.messages?.length-1]
                }
            })
            return conversation;
        }
        else{
            return []
        }

  }
  

export const logout=async(request,response)=>{
    try {
        const cookieOption = {
            http:true,
            secure:true
        }
        return response.cookie('token','',cookieOption).status(200).json({
            message:"Logout Successfull",
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

export const updateUserDetails=async(request,response)=>{
    try {
        const token=request.cookies.token || ""
        const user = await tokenHandler(token)
        // console.log(user)
        const {name,profile_pic}=request.body
        const updatedUser= await UserModel.findByIdAndUpdate({_id:user._id},{
            name,
            profile_pic
        })
        const userInformation = await UserModel.findById(user._id)
        return response.status(200).json({
            message:"Updated Successfully",
            data:userInformation,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

export const SearchUser=async(request,response)=>{
    try {
        const {search} = request.body
        const query = new RegExp(search,'i','g')
        const user = await UserModel.find({
            "$or":[
                {name:query},
                {email:query}
            ]
        }).select("-password")
        return response.status(200).json({
            message:"All User",
            data:user,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}



