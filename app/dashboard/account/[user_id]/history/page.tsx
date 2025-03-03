import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ArrowLeftIcon } from "@heroui/shared-icons";
import { Metadata } from "next";
import { Suspense } from "react";

import HistoryTable from "./components/history-table";
import Loading from "./loading";

import { fontRoboto } from "@/config/fonts";
import { DetectionHistory, IUser } from "@/config/types";
import { adminDB } from "@/lib/firebase";

export const metadata: Metadata = {
  title: "History - Orhemlog",
};
interface Props {
  params: Promise<{ user_id: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchData(uid: string) {
  const userRef = adminDB.collection("users").doc(uid);
  const snapshot = await userRef.get();
  const data = snapshot.data();

  const historyRef = adminDB
    .collection("detections")
    .where("user_id", "==", uid);
  const historySnapshot = await historyRef.get();
  const history = historySnapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id.toString(),
      ...docData,
      createdAt: docData.createdAt?.toDate().toISOString() || null,
    };
  });

  return { user: data as IUser, histories: history as DetectionHistory[] };
}

export default async function UserHistory({ params }: Props) {
  const { user_id } = await params;

  const data = await fetchData(user_id);

  if (!data.user) {
    return (
      <div
        className={`flex h-[calc(100vh-70px)] flex-col items-center justify-center ${fontRoboto.className} text-center`}
      >
        <h1 className="text-3xl">User Not Found</h1>
        <Button
          as={Link}
          href="/dashboard/account"
          color="primary"
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col pt-6 ${fontRoboto.className} gap-4`}>
      <div>
        <Button
          as={Link}
          color="primary"
          href={`/dashboard/account/`}
          startContent={<ArrowLeftIcon className="size-4" />}
          size="sm"
        >
          Back
        </Button>
        <p className="mt-2 text-xl font-semibold md:text-2xl">
          Detection History
        </p>
        <p className="text-lg md:text-xl">User: {data.user.name}</p>
      </div>

      <div>
        <Suspense fallback={<Loading />}>
          <HistoryTable histories={data.histories} />
          {/* <Loading /> */}
        </Suspense>
      </div>

      <footer className="mt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
