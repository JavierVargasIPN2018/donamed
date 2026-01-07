"use client";

import { usePathname } from "next/navigation";

import { HouseIcon, PlusCircle } from "lucide-react";

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

import { Button } from "@/client/components/ui/button";
import { UserMenuNavbar } from "@/client/modules/identity/features/navigation/user-menu/user-menu-navbar";
import { useCreateMedicationModal } from "@/client/modules/inventory/features/create-medication/use-create-medication.modal";

export function HomeHeader() {
  const pathname = usePathname();
  const createModal = useCreateMedicationModal();

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
          <Button
            onClick={() => {
              createModal.onOpen();
            }}
            variant="icon"
            size="icon-lg"
            className="gap-2 p-0 roundend-full"
          >
            <PlusCircle />
          </Button>
          <UserMenuNavbar user={session?.user} />
        </HeaderActions>
      </HeaderContainer>
    </Header>
  );
}
