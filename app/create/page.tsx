"use client";
import CreatePackForm from "@/src/feature/create-pack-form";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         Создать
        <CreatePackForm/>
    </main>
  )
}