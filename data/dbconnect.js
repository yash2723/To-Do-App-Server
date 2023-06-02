import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbname: "test"
    }).then(() => {
        console.log("Database Connection Successfully....");
    }).catch((e) => {
        console.log(e);
    });
}

export default connectDB;