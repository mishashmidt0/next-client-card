"use client";

import Chat from "@/src/widgets/chat";
import PackList from "@/src/widgets/pack-list";
import Link from "next/link";
import {ROOTS} from "@/src/shared/const/root";


//TODO сделать попап для копирования ссылки
//TODO бэк отправлять Имя карточки
//TODO зеленная кнопка выбрать героя для -> поиска, что бы угадывали, ответ успешно или не успешно

export default function Home() {

    return (
        <main className="flex flex-col items-center gap-10 p-24 min-h-screen">
            <Link href={ROOTS.main} className={'absolute top-10 left-10 font-medium bg-green-200 p-3'} >На главную</Link>
            <h1>Комната</h1>
            <div className={'grid grid-cols-4 gap-4'}>
                <Chat />

                <PackList/>
            </div>
        </main>
    )
}