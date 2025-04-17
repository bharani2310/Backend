import express from 'express'
import { Server } from 'socket.io'
import  http  from 'http';
import { tokenHandler } from './tokenHandler.js';
import UserModel from '../models/UserModel.js';
import { MessageModel,ConversationModel } from '../models/ConversationModel.js';
import { getConversation } from '../controller/userController.js';

const app = express()
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:true,
        credentials:true
    }
})

// Socket running at port 8080


//online user
const onlineUser = new Set()

io.on("connection",async(socket)=>{
    // console.log("User Connected ",socket.id)
    const token = socket.handshake.auth.token

    //current user details
    const user=await tokenHandler(token)
    
    if (!user?._id) {
        // console.log("User ID not found, cannot join room.");
        return;
    }

    //create a room
    socket.join(user?._id.toString())
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser',Array.from(onlineUser))

    socket.on('message-page',async(userId)=>{
        // console.log("user triggereing evenyt",userId)
        const userDetails = await UserModel.findOne({_id:userId}).select("-password")
        const payload={
            _id:userDetails?._id,
            name:userDetails?.name,
            email:userDetails?.email,
            online:onlineUser.has(userId),
            profile_pic:userDetails?.profile_pic
        }
        socket.emit('message-user',payload) 

        //get previous message
        const getConversationMessage = await ConversationModel.findOne({
            "$or" : [
                {sender : user?._id,receiver : userId},
                {sender : userId,receiver : user?._id}
            ]
        }).populate('messages').sort({updatedAt : -1})
        // console.log("get",getConversationMessage)

        socket.emit('message',getConversationMessage.messages)
    })


    

    //new Message
    socket.on('new message',async(data)=>{


        //Check Existing Conversation
        let conversation = await ConversationModel.findOne({
            "$or" : [
                {sender : data?.sender,receiver : data?.receiver},
                {sender : data?.receiver,receiver : data?.sender}
            ]
        })


        if(!conversation){
            const createConversation = await ConversationModel({
                sender:data?.sender,
                receiver:data?.receiver
            })
            conversation = await createConversation.save()
        }

        const message = await MessageModel({
            text:data?.text,
            imageUrl:data?.imageUrl,
            videoUrl:data?.videoUrl,
            sender:data?.sender,
            msgByUserId:data?.msgByUserId
        })

        // console.log("send",message)
        const saveMessage = await message.save()
        const updateConversation = await ConversationModel.updateOne({_id:conversation?._id},{
            "$push" : {messages:saveMessage?._id}
        })

        const getConversationMessage = await ConversationModel.findOne({
            "$or" : [
                {sender : data?.sender,receiver : data?.receiver},
                {sender : data?.receiver,receiver : data?.sender}
            ]
        }).populate('messages').sort({updatedAt : -1})
        // console.log("get",getConversationMessage)

        io.to(data?.sender.toString()).emit("message", getConversationMessage?.messages || []);
        io.to(data?.receiver.toString()).emit("message", getConversationMessage?.messages || []);

        //send conversation
        const convSender = await getConversation(data?.sender)
        const convReceiver = await getConversation(data?.sender)

        // console.log("send123",convSender)
        // console.log("receive123",convReceiver)

        socket.emit('conversation',convSender)

        io.to(data?.sender?.toString()).emit("conversation", convSender);
        io.to(data?.receiver?.toString()).emit("conversation", convReceiver);
                
 
        // io.emit('message', getConversationMessage);

    })

    //sidebar
    socket.on('sidebar',async(currentUserId)=>{
        const conv = await getConversation(currentUserId)
        socket.emit('conversation',conv)
    })
 
    socket.on('seen',async(msgByUserId)=>{
        let conversation = await ConversationModel.findOne({
            "$or" : [
                {sender : user?._id,receiver : msgByUserId},
                {sender : msgByUserId,receiver : user?._id}
            ]
        })
        const conversationMessageId = conversation?.messages || []

        const updateMessages = await MessageModel.updateMany(
            {
                _id:{"$in":conversationMessageId},
                msgByUserId:msgByUserId
            },
            {
                "$set" : {seen:true}
            } 
        )

        const convSender = await getConversation(user?._id.toString())
        const convReceiver = await getConversation(msgByUserId)

        socket.emit('conversation',convSender)
        io.to(user?._id?.toString()).emit("conversation", convSender);
        io.to(msgByUserId).emit("conversation", convReceiver);
    })

    //disconnect
    socket.on("disconnect",()=>{
        onlineUser.delete(user?._id.toString())
        // console.log("User Disconnected",socket.id)
    }) 
})

export { app, server ,onlineUser};      