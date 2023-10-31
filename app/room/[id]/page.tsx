"use client";

import Chat from "@/src/widgets/chat";
import PackList from "@/src/widgets/pack-list";

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Комната
            <PackList/>
            <Chat/>
        </main>
    )
}