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
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { fontBlackOpsOne } from "@/config/fonts";
import Route from "@/config/routes";

export default function DashboardNavbar() {
  const pathname = usePathname();
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
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <p
            className={`text-xl pt-1 lg:pt-0 lg:text-2xl font-semibold text-white ${fontBlackOpsOne.className}`}
          >
            ORHEMLOG
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
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
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar size="md" name="Adm" className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem key="logout" href="/">
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
