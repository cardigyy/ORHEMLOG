import { NextRequest, NextResponse } from "next/server";

import { adminAuth, adminDB } from "@/lib/firebase";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const uid = (await params).id;

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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const uid = (await params).id;
    const body = await req.json();

    await adminAuth.updateUser(uid, {
      displayName: body.name,
      password: body.password ? body.password : undefined,
      disabled: !(body.status == 1),
    });

    await adminAuth.setCustomUserClaims(uid, {
      division: body.division,
    });

    await adminDB.collection("users").doc(uid).update({
      name: body.name,
      division: body.division,
      status: body.status,
    });

    return new NextResponse(
      JSON.stringify({ message: "User updated successfully" }),
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
