import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    // console.log("Message Sent", req.params.id);   // here the 'id' field is coming from api url link ":id" portion

    try {
        // message content
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;  // because we've added req.user in protectRoute middleware

        // find conversation btw these 2 users
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // SOCKET IO functionality will come here

        // await conversation.save();
        // await newMessage.save();

        // The above 2 functions will execute one by one but we can perform them parallely using a promise
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");  
        // using this command we'll get each of the actual messages (not reference) between these 2 users, one by one as an object

        if(!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

