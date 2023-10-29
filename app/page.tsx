"use client";
import Link from "next/link";
import crypto from "crypto";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         Старт
        <Link href={`/room/${crypto.randomBytes(20).toString('hex')}`}>Зайти в комнату</Link>
    </main>
  )
}
