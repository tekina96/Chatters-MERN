import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error: "Unauthorised - No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // JWT_SECRET is used to verify the token
        if(!decoded) {
            return res.status(401).json({error: "Unauthorised - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");  
        // It is called userId because we've mentioned user id when we generated the JWT token in generateToken.js

        if(!user) {
            return res.status(404).json({error: "user not found"});
        }

        // If all checks are passed
        req.user = user;

        next();  
        // Now after passing everything we call this function and next function runs, which is sendMessage function

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export default protectRoute;