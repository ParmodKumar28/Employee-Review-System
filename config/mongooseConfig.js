// Connecting to the mongodb database with mongoose.
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Url or string of the databse.
const url = process.env.MONGO_DB;

const connectUsingMongoose = async()=>{
    try {
        mongoose.connect(url, {
            family: 4
        });
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to database.");
    }

}

export default connectUsingMongoose;