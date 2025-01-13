import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, currentPassword, newPassword } = reqBody;
        console.log(email, currentPassword, newPassword);

        console.log("Request Body:", { email, currentPassword, newPassword });

        // Validate request
        if (!email || !currentPassword || !newPassword) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email  });
        console.log("User found:", user);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Check if current password matches
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        console.log("Password match:", isPasswordMatch);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 400 }
            );
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log("Generated salt:", salt);
        console.log("Hashed new password:", hashedPassword);

        // Update password
        user.password = hashedPassword;
        await user.save();
        console.log("User password updated successfully");

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error: any) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            { error: "Internal Server Error: " + error.message },
            { status: 500 }
        );
    }
}
