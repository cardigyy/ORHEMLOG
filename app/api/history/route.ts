import { NextRequest, NextResponse } from "next/server";

import { adminDB } from "@/lib/firebase";

export async function DELETE(req: NextRequest) {
  try {
    const uid = req.nextUrl.searchParams.get("id");

    if (!uid) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid request", data: uid }),
        {
          status: 400,
        }
      );
    }

    await adminDB.collection("detections").doc(uid).delete();

    return new NextResponse(
      JSON.stringify({ message: "History deleted successfully" }),
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
