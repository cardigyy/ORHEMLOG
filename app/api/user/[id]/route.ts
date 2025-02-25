import { NextRequest, NextResponse } from "next/server";

import { adminAuth, adminDB } from "@/lib/firebase";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uid = params.id;

    await adminAuth.deleteUser(uid);
    await adminDB.collection("users").doc(uid).delete();

    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
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
