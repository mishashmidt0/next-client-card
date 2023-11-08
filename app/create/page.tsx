"use client";
import Back from "@/src/entity/back";
import CreatePackForm from "@/src/feature/create-pack-form";
import { ROUTES } from "@/src/shared/const/routes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Back href={ROUTES.main} title={"На главную"} />
      Создать
      <CreatePackForm />
    </main>
  );
}
