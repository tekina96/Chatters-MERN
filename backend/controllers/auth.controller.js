import User from "../models/user.model.js";
import bcrypt from "bcryptjs";  // We use this to make sure the password is hidden on database, so no one can see it if DB get's exploited
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        
        // Checking if password matches the required conditions
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password don't match"});
        }
        // Checking if username exists on DB
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({error: "Username already exists"});
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);  // The higher value, more secure PW, but time taken will be more as well
        const hashedPassword = await bcrypt.hash(password, salt);

        // Profile pic: https://avatar-placeholder.iran.liara.run/document
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // get new user
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        // Saving new user to DB
        if(newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);  // we send userId and response

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
        

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
    // res.send("signup user")
    // console.log("signup user");
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        // So this function checks if password exists or not, if we don't find user of that username, then it matches with an empty string, so it returns a false

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}