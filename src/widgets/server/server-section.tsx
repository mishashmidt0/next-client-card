"use client";
import { type ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

import { ActionTooltip } from "@/src/entity/action-tooltip";
import { useModal } from "@/src/shared/hooks/use-modal-store";
import { type ServerWithMembersWithProfiles } from "@/src/shared/types/server";

interface ServerSectionProps {
  role?: MemberRole;
  label: string;
  channelType?: ChannelType;
  sectionType: "channels" | "members";
  server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
  sectionType,
  channelType,
  server,
  label,
  role,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className={"flex items-center justify-between py-2"}>
      <p
        className={
          "text-zinc-500 dark:text-zinc-400 text-xs uppercase font-semibold"
        }
      >
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label={"Создать комнату"} side={"top"}>
          <button
            onClick={() => {
              onOpen("createChannel", { channelType });
            }}
            className={
              "text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            }
          >
            <Plus className={"h-4 w-4 "} />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label={"Управление участниками"} side={"top"}>
          <button
            onClick={() => {
              onOpen("members", { server });
            }}
            className={
              "text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            }
          >
            <Settings className={"h-4 w-4 "} />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
