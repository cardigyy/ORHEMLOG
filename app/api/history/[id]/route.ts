import { NextRequest, NextResponse } from "next/server";

import { adminDB } from "@/lib/firebase";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uid = params.id;

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
