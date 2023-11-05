"use client";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import {ROOTS} from "@/src/shared/const/root";


const navigate = [
    {title:'Начать играть', href:ROOTS.room(uuidv4())},
    {title:'Создать колоду', href:ROOTS.create},
    {title:'Мои колоды', href:ROOTS.main},
]
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         Старт

        <div className={'flex flex-col gap-4 items-center'}>
            {navigate.map(({title,href},index)=>  <Link key={index} href={href}>{title}</Link>)}
        </div>
    </main>
  )
}
