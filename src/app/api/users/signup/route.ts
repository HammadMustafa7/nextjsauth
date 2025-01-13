import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";



connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody;
        // console.log(username, email, password);

        // console.log(reqBody);

        if(!username || !email || !password) {  
            return NextResponse.json({ error: "All fields are required" },
             { status: 400 });  
        }
        //check if user already exists on db
        const user = await User.findOne({ email });

        if(user) {
            return NextResponse.json({ error: "User already exists" },  
             { status: 400 });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        // console.log("salt: " ,salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log("hashedPassword: " , hashedPassword);


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        // console.log("savedUser: " , savedUser);

        //send verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser   
            },
            { status: 200 });
        }
    catch (error: string | number | boolean | any)  {
        return NextResponse.json({ error: error.message },
             { status: 500 });
    }



}