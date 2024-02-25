import { response } from "express";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";


export const sendMessage = async (req,res) => {
  try {
    const {message} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {$all: [senderId,receiverId]}
    });

    if(!conversation) {
      conversation = await Conversation.create({
        participants:[senderId,receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    await Promise.all([conversation.save(),newMessage.save()])

    res.status(200).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}

export const getMessage = async (req,res) =>{
  try {
    const {id:userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {$all: [senderId,userToChatId]},
    }).populate("message");

    if(!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
    
  } catch (error) {
    console.log("Error in getMessage controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}

