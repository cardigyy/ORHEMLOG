import { NextRequest, NextResponse } from "next/server";

import {
  adminAuth,
  FIREBASE_TIMESTAMP,
  adminDB as firestore,
} from "@/lib/firebase";

export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const result = await adminAuth.createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      displayName: data.name,
      disabled: false,
    });

    await adminAuth.setCustomUserClaims(result.uid, {
      division: data.division,
    });

    await firestore.collection("users").doc(result.uid).set({
      name: data.name,
      division: data.division,
      email: data.email,
      status: 1,
      createdAt: FIREBASE_TIMESTAMP,
      updatedAt: FIREBASE_TIMESTAMP,
    });

    return new NextResponse(
      JSON.stringify({
        message: "User added successfully",
        data: { user: result },
      }),
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
