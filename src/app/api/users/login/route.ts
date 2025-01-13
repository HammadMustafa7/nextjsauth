import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { email, password} = reqBody;

        console.log(reqBody);

        if(!email || !password) {  
            return NextResponse.json({ error: "All fields are required" },
             { status: 400 });  
        }

        // check if user exists on db
        const user = await User.findOne({ email });


        if(!user) {
            return NextResponse.json({ error: "User does not exist" },  
             { status: 400 });
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {    
            return NextResponse.json({ error: "Invalid password" },  
             { status: 400 });  
            }

            // create token data
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email,
            }

            //create token
            const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

            const responce = NextResponse.json({
                message: "Login successful",
                success: true,
                
            })

            responce.cookies.set("token", token, {
                httpOnly: true,
            })
            
            return responce;

        
        }
    catch (error: any)  {
        return NextResponse.json({ error: error.message },
             { status: 500 });
    }



}