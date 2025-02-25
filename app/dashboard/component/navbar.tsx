import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

import { fontBlackOpsOne } from "@/config/fonts";

export default function DashboardNavbar({ logout }: { logout: () => void }) {
  return (
    <Navbar maxWidth="2xl" isBordered className="bg-[#403956]" height={68}>
      <NavbarContent>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white sm:hidden"
        /> */}
        <NavbarBrand>
          <p
            className={`pt-1 text-xl font-semibold text-white sm:text-2xl lg:pt-0 ${fontBlackOpsOne.className}`}
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

      {/* <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathname === item.url ? "primary" : "white"}
              className="w-full"
              href={item.url}
              size="lg"
            >
              {item.display}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}
