import DashboardNavbar from "./component/navbar";

import { fontRoboto } from "@/config/fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontRoboto.className}`}>
      <DashboardNavbar />

      <div className="max-w-[1536px] mx-auto px-6">{children}</div>
    </div>
  );
}
