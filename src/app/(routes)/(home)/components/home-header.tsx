"use client";

import { usePathname } from "next/navigation";

import { HouseIcon } from "lucide-react";

import {
  DesktopNav,
  type NavItem as DesktopNavItem,
} from "@/client/components/layouts/navbar/desktop-nav";
import { Logo } from "@client/components/branding/logo";
import {
  Header,
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  HeaderMedia,
} from "@client/components/layouts/header";

import { authClient } from "@/app/lib/auth-client";


import { UserMenuNavbar } from "@/client/modules/identity/features/navigation/user-menu/user-menu-navbar";

export function HomeHeader() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const landingMenu: DesktopNavItem[] = [
    { href: "/", label: "Inicio", icon: HouseIcon },
  ];

  return (
    <Header sticky={true}>
      <HeaderContainer className="h-16">
        <HeaderMedia>
          <Logo size="lg" />
        </HeaderMedia>

        <HeaderContent className="mx-auto">
          <DesktopNav menu={landingMenu} pathname={pathname} />
        </HeaderContent>

        <HeaderActions>
          <UserMenuNavbar user={session?.user} />
        </HeaderActions>
      </HeaderContainer>
    </Header>
  );
}
