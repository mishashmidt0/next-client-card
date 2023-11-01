"use client";

import Chat from "@/src/widgets/chat";
import PackList from "@/src/widgets/pack-list";

export default function Home() {

    return (
        <main className="flex flex-col items-center gap-10 p-24 min-h-screen">
            <h1>Комната</h1>
            <div className={'flex justify-between gap-10 w-full'}>
                <div className={'flex flex-col justify-end grow'}>
                    <Chat />
                </div>

                <PackList/>
            </div>
        </main>
    )
}