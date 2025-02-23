import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/firebase-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );
    // console.log(user);
    return new NextResponse(
      JSON.stringify({ message: "Login Success", data: user }),
      {
        status: 200,
      }
    );
    // return NextResponse.redirect("/dashboard");
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", data: error }),
      {
        status: 500,
      }
    );
  }
}
