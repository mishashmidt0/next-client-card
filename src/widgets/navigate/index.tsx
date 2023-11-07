"use client";
import { useId } from "react";

import Link from "next/link";

import { ROUTES } from "@/src/shared/const/routes";

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
  ];

  return (
    <nav className={"flex flex-col gap-4 items-center"}>
      {navigate.map(({ title, href }, index) => (
        <Link key={index} href={href}>
          {title}
        </Link>
      ))}
    </nav>
  );
}
