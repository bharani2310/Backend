import mongoose from "mongoose"

const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        default:''
    },
    imageUrl:{
        type:String,
        default:''
    },
    videoUrl:{
        type:String,
        default:''
    },
    seen:{
        type:Boolean,
        default:false
    },
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    msgByUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const conversationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    messages:[
        {
            type:String,
            ref:'Message'
        }
    ]
},{
    timestamps:true
})

const MessageModel=mongoose.model('Message',messageSchema,"Chat_Message")
const ConversationModel=mongoose.model('Conversation',conversationSchema,"Chat_Conversation")

export {MessageModel,ConversationModel}