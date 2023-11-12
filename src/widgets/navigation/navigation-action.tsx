"use client";
import { Plus } from "lucide-react";

import { ActionTooltip } from "@/src/entity/action-tooltip";
import { useModal } from "@/src/shared/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side={"right"} align={"center"} label={"Добавить сервер"}>
        <button
          className={"group flex items-center"}
          onClick={() => {
            onOpen("createServer");
          }}
        >
          <div
            className={
              "flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-natural-700 group-hover:bg-emerald-500"
            }
          >
            <Plus
              className={"group-hover:text-white transition text-emerald-500"}
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
