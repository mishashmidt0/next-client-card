"use client";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         Старт

        <div className={'flex flex-col gap-4 items-center'}>
            <Link href={`/room/${uuidv4()}`}>Начать играть</Link>
            <Link href={`/create`}>Создать колоду</Link>
            <Link href={`/create`}>Мои колоды</Link>
        </div>
    </main>
  )
}
