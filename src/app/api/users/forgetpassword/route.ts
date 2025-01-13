import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token, password} = reqBody;

        if (!password && !token) {
            return NextResponse.json(
                { error: "Password and token is required" },
                { status: 400 }
            );
        }
        console.log(token, password);   
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Hash the new password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        console.log(hashedPassword);
        // Remove the reset token fields
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            { message: "Password reset successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error resetting password:", error);
        return NextResponse.json(
            { error: "Something went wrong: " + error.message },
            { status: 500 }
        );
    }
}
