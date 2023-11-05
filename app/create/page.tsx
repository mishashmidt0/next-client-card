"use client";
import CreatePackForm from "@/src/feature/create-pack-form";
import Back from "@/src/entity/back";
import {ROUTES} from "@/src/shared/const/root";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Back href={ROUTES.main} title={'На главную'}/>
         Создать

        <CreatePackForm/>
    </main>
  )
}