import { Suspense } from "react";

import UserTableData from "./components/user-table-data";
import Loading from "./loading";

import { fontRoboto } from "@/config/fonts";

interface User {
  key: string;
  name: string;
  division: string;
  status: boolean;
}

function generateRows(count: number): User[] {
  return Array.from({ length: count }, (_, index) => ({
    key: index.toString(),
    name: `Name ${index}`,
    division: index % 3 === 0 ? `Apasi` : `Letsgo`,
    status: index % 2 === 0,
  }));
}

const accountData = generateRows(50);

async function fetchData(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accountData);
    }, 500);
  });
}

export default async function Dashboard() {
  const users = await fetchData();
  return (
    <div className={`pt-6 flex flex-col ${fontRoboto.className}`}>
      <p className="text-xl font-semibold">Account Management</p>

      <Suspense fallback={<Loading />}>
        <UserTableData users={users} />
      </Suspense>
    </div>
  );
}
