import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()
// to send email to reset password only
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token, email } = reqBody;
        console.log(token, email);

        const user = await User.findOne({ email });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }
        console.log(user);

        // user.forgotPasswordToken = token;
        // user.forgotPasswordTokenExpiry = Date.now() + 3600000;
        await user.save();

        //send verification email
        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id
        })

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error: string | number | boolean | any) {
        return NextResponse.json({ error: "Something went wrong: " + error.message }, { status: 500 });
    }
}