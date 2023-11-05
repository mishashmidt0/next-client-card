import Chat from "@/src/widgets/chat";
import PackList from "@/src/widgets/pack-list";
import {ROUTES} from "@/src/shared/const/routes";
import Back from "@/src/entity/back";


//TODO сделать попап для копирования ссылки
//TODO бэк отправлять Имя карточки
//TODO зеленная кнопка выбрать героя для -> поиска, что бы угадывали, ответ успешно или не успешно

export default function Home() {

    return (
        <main className="flex flex-col items-center gap-10 p-24 min-h-screen">
            <Back href={ROUTES.main} title={'На главную'}/>
            <h1>Комната</h1>
            <div className={'grid grid-cols-4 gap-4'}>
                <Chat />

                <PackList/>
            </div>
        </main>
    )
}