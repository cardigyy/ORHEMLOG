import { Suspense } from "react";

import UserTableData from "./components/user-table-data";
import Loading from "./loading";

import { fontRoboto } from "@/config/fonts";
import { User } from "@/config/types";

function generateRows(count: number): User[] {
  return Array.from({ length: count }, (_, index) => ({
    key: index.toString(),
    name: `Name ${index}`,
    email: `name${index}@gmail.com`,
    division: index % 3 === 0 ? `Apasi` : `Letsgo`,
    status: index % 2 === 0,
  }));
}

const accountData = generateRows(50);

async function fetchData(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accountData);
    }, 100);
  });
}

export default async function Dashboard() {
  const users = await fetchData();
  return (
    <div className={`flex flex-col pt-6 ${fontRoboto.className}`}>
      <p className="text-xl font-semibold md:text-2xl">Account Management</p>

      <Suspense fallback={<Loading />}>
        <UserTableData users={users} />
      </Suspense>

      <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
