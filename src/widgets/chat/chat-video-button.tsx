"use client";

import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ActionTooltip } from "@/src/entity/action-tooltip";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video";

  const onClick = async () => {
    router.push(`${pathname}`, {
      query: {
        video: isVideo ? undefined : true,
      },
      scroll: false,
    });
  };

  return (
    <ActionTooltip side={"bottom"} label={tooltipLabel}>
      <button onClick={onClick} className={"hover:opacity-75 transition mr-4"}>
        <Icon className={"w-6 h-6 text-zinc-500 dark:text-zinc-400"} />
      </button>
    </ActionTooltip>
  );
};
