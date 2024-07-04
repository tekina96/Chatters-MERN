import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // These upper lines basically says the id will be same as user id or user model, ( referrenced to the user collection)
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {timestamps: true});  // this will provide 2 fields: CreatedAt, UpdatedAt

const Message = mongoose.model("Message", messageSchema);

export default Message;