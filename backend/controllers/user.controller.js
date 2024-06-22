import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        // first we get currently authenticated user id
        const loggedInUserId = req.user._id;

        // Fetching all users from DB except the one who is logged in (it's obvious we don't wanna see ourselves in the list)
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUserForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}