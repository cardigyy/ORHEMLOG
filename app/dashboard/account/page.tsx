import { Metadata } from "next";
import { Suspense } from "react";

import UserTableData from "./components/user-table-data";
import Loading from "./loading";

import { fontRoboto } from "@/config/fonts";
import { IUser } from "@/config/types";
import { adminDB } from "@/lib/firebase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Account - Orhemlog",
};

async function fetchData(): Promise<IUser[]> {
  const userRef = adminDB.collection("users").orderBy("name");
  const snapshot = await userRef.get();
  const data = snapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id.toString(),
      ...docData,
      createdAt: docData.createdAt?.toDate().toISOString() || null,
      updatedAt: docData.updatedAt?.toDate().toISOString() || null,
    };
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data as IUser[];
}

export default async function Dashboard() {
  const users = await fetchData();

  return (
    <>
      <div className={`flex flex-col pt-6 ${fontRoboto.className}`}>
        <p className="text-xl font-semibold md:text-2xl">Account Management</p>

        <Suspense fallback={<Loading />}>
          <UserTableData users={users} />
        </Suspense>

        <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    </>
  );
}
