import mongoose from "mongoose";

export async function connect(){
    try {
      console.log("MONGODB_URI:", process.env.MONGODB_URI!);
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB Successfully");
        })
        connection.on("error", (err) => {
            console.log("Error connecting to MongoDB:", err);
            process.exit(1);
        })
    } catch (error) {
        console.error("Something went wrong", error);
    }
}