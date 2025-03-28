import { NextRequest, NextResponse } from "next/server";

import { adminAuth, adminDB } from "@/lib/firebase";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const uid = (await params).id;

    const user = await adminDB.collection("users").doc(uid).get();

    return new NextResponse(
      JSON.stringify({
        message: "User fetched successfully",
        data: {
          id: user.id,
          ...user.data(),
        },
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
    });

    await adminAuth.setCustomUserClaims(uid, {
      division: body.division,
    });

    await adminDB.collection("users").doc(uid).update({
      name: body.name,
      division: body.division,
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
