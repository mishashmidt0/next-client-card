"use client";
import Link from "next/link";
import {ROUTES} from "@/src/shared/const/routes";
import {useId} from "react";



export default function Home() {
    const id = useId()
    const navigate = [
        {title:'Начать играть', href:ROUTES.room(id)},
        {title:'Создать колоду', href:ROUTES.login},
        {title:'Мои колоды', href:ROUTES.main},
    ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         Старт

        <div className={'flex flex-col gap-4 items-center'}>
            {navigate.map(({title,href},index)=>  <Link key={index} href={href}>{title}</Link>)}
        </div>
    </main>
  )
}
