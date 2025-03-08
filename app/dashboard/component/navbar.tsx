import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { AvatarIcon } from "@heroui/shared-icons";
import { User } from "firebase/auth";
import Link from "next/link";

import { LogoutIcon } from "@/components/icons";
import { fontBlackOpsOne } from "@/config/fonts";
import Route from "@/config/routes";

export default function DashboardNavbar({
  user,
  logout,
}: {
  user: User | null;
  logout: () => void;
}) {
  return (
    <Navbar maxWidth="2xl" isBordered className="bg-[#403956]" height={68}>
      <NavbarContent>
        <NavbarBrand>
          <Link
            href={Route.DASHBOARD_ACCOUNT.url}
            className={`cursor-pointer pt-1 text-xl font-semibold text-white sm:text-2xl lg:pt-0 ${fontBlackOpsOne.className}`}
          >
            ORHEMLOG
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar size="md" className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu variant="flat" disabledKeys={["user-profile"]}>
            <DropdownItem key={"user-profile"} showDivider>
              {user && (
                <>
                  <p className="text-sm font-semibold text-black">
                    {user.displayName}
                  </p>
                  <p className="text-sm font-semibold">{user.email}</p>
                </>
              )}
            </DropdownItem>
            <DropdownItem
              key="profile"
              href="profile"
              startContent={<AvatarIcon />}
            >
              <p>Profile</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              onPress={logout}
              startContent={<LogoutIcon />}
            >
              <p>Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
