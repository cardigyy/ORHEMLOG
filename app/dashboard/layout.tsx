"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardNavbar from "./component/navbar";

import { fontRoboto } from "@/config/fonts";
import { useAuth } from "@/lib/auth-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading]);

  return (
    <div className={`${fontRoboto.className}`}>
      <DashboardNavbar user={user} logout={logout} />

      <div className="mx-auto max-w-[1536px] px-6">{children}</div>
    </div>
  );
}
