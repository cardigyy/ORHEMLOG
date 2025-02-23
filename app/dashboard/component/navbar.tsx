"use client";

import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useState } from "react";

import { fontBlackOpsOne } from "@/config/fonts";

export default function DashboardNavbar({ logout }: { logout: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Account", "History"];
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      isBordered
      className="bg-[#403956]"
      height={68}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white sm:hidden"
        />
        <NavbarBrand>
          <p
            className={`pt-1 text-xl font-semibold text-white lg:pt-0 lg:text-2xl ${fontBlackOpsOne.className}`}
          >
            ORHEMLOG
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem isActive>
          <Link
            href={Route.DASHBOARD_ACCOUNT}
            className={
              pathname === Route.DASHBOARD_ACCOUNT
                ? `text-[#FFD700]`
                : `text-white`
            }
            size="lg"
            underline="hover"
          >
            Account
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={Route.DASHBOARD_HISTORY}
            className={
              pathname === Route.DASHBOARD_HISTORY
                ? `text-[#FFD700]`
                : `text-white`
            }
            size="lg"
            underline="hover"
          >
            History
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar size="md" className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem key="logout" onPress={logout}>
              <p>Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="/dashboard">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
