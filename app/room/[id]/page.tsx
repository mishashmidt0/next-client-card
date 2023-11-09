import Back from "@/src/entity/back";
import { ROUTES } from "@/src/shared/const/routes";
import Chat from "@/src/widgets/chat";
import PackList from "@/src/widgets/pack-list";

// TODO сделать попап для копирования ссылки
// TODO бэк отправлять Имя карточки
// TODO зеленная кнопка выбрать героя для -> поиска, что бы угадывали, ответ успешно или не успешно

export default function Home() {
  return (
    <div>
      <Back href={ROUTES.main} title={"На главную"} />
      <div className={"grid grid-auto-cols gap-4"}>
        <Chat />

        <PackList />
      </div>
    </div>
  );
}
