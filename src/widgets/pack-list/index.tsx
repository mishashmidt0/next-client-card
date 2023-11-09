"use client";
import CardHero from "src/entity/card-hero";

import { Skeleton } from "@/src/shared/ui/skeleton";
import useGetPack from "@/src/widgets/pack-list/model/query";

// TODO Сохранять изображения на бэке и выдавать их ссылку
export default function PackList() {
  const { data, isPending } = useGetPack();

  return (
    <div className={"grid grid-cols-6 gap-12 col-span-3"}>
      {!isPending &&
        data?.map(({ url, name }, index) => (
          <CardHero key={index} url={url} name={name} />
        ))}
      {isPending &&
        Array.from({ length: 24 })?.map((el, index) => (
          <Skeleton
            key={index}
            className="w-[180px] aspect-square rounded-md"
          />
        ))}
    </div>
  );
}
