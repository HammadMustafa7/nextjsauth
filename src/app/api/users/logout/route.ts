import { NextResponse, NextRequest } from "next/server";


export async function GET() {

    try {
        const responce = NextResponse.json({ message: "Logout successful!", success: true } )
        responce.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        } );

        return responce
        
    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong: " + error.message }, { status: 500 });
    }

}