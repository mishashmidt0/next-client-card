"use client";
import Card from "@/src/entity/card";
import useGetPack from "@/src/widgets/pack-list/model/query";

// TODO Сохранять изображения на бэке и выдавать их ссылку
export default function PackList() {
  const { data, isPending } = useGetPack();

  return (
    <div className={"grid grid-cols-6 gap-12 col-span-3"}>
      {!isPending &&
        data?.map(({ url, name }, index) => (
          <Card key={index} url={url} name={name} />
        ))}
      {isPending &&
        Array.from({ length: 24 })?.map((el, index) => (
          <div key={index} className={"bg-green-200 aspect-square w-[180px]"} />
        ))}
    </div>
  );
}
