"use client";
import { useId } from "react";

import Link from "next/link";

import { ROUTES } from "@/src/shared/const/routes";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuList,
} from "@/src/shared/ui/navigation-menu";

interface Props {
  isAuth: boolean;
}
export default function Navigate({ isAuth }: Props) {
  const id = useId();

  const navigate = [
    { title: "Начать играть", href: ROUTES.room(id) },
    {
      title: "Создать колоду",
      href: isAuth ? ROUTES.createPack : ROUTES.login,
    },
    { title: "Мои колоды", href: isAuth ? ROUTES.myPack : ROUTES.login },
    { title: "Настройки", href: isAuth ? ROUTES.setting : ROUTES.login },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className={"gap-2"}>
        {navigate.map(({ title, href }, index) => (
          <NavigationMenuItem key={index}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
