"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { ActionTooltip } from "@/src/entity/action-tooltip";
import { cn } from "@/src/shared/lib/utils";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}
export const NavigationItem = ({ name, imageUrl, id }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} side={"right"} align={"center"}>
      <button onClick={onClick} className={"group relative flex items-center"}>
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]",
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden ",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]",
          )}
        >
          <Image
            src={imageUrl}
            alt={"Channel"}
            fill
            sizes={"w-[48px]"}
            className={"object-cover"}
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
