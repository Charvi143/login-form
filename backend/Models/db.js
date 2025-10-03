import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URL;

(async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log('MongoDB Connected...');
        
    } catch (err) {
        console.log("MongoDB Connection Error:", err)
    }
})();


