import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB");      
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        throw new Error("Cannot disconnect from MongoDB");
    }
};

export default connectToMongoDB;