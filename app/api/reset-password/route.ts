import { sendPasswordResetEmail } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "./../../../lib/firebase-client";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await sendPasswordResetEmail(auth, data.email);
    return new NextResponse(
      JSON.stringify({ message: "Reset password email has been sent" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", data: error }),
      {
        status: 500,
      }
    );
  }
}
