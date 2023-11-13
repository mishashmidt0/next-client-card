"use client";

import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
} from "lucide-react";

import { useModal } from "@/src/shared/hooks/use-modal-store";
import { type ServerWithMembersWithProfiles } from "@/src/shared/types/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdown-menu";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}
export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"focus:outline-none "} asChild>
        <button
          className={
            "w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
          }
        >
          {server.name}
          <ChevronDown className={"h-5 w-5 ml-auto"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          "w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
        }
      >
        {isModerator && (
          <DropdownMenuItem
            onClick={() => {
              onOpen("invite", { server });
            }}
            className={
              "text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            }
          >
            Invite people
            <UserPlus className={"h-4 w-4 ml-auto"} />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => {
              onOpen("editServer", { server });
            }}
            className={"px-3 py-2 text-sm cursor-pointer"}
          >
            Server settings
            <Settings className={"h-4 w-4 ml-auto"} />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => {
              onOpen("members", { server });
            }}
            className={"px-3 py-2 text-sm cursor-pointer"}
          >
            Menage Members
            <Settings className={"h-4 w-4 ml-auto"} />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className={"px-3 py-2 text-sm cursor-pointer"}>
            Create Channel
            <PlusCircle className={"h-4 w-4 ml-auto"} />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            className={"text-rose-500 px-3 py-2 text-sm cursor-pointer"}
          >
            Delete Server
            <Trash className={"h-4 w-4 ml-auto"} />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className={"text-rose-500 px-3 py-2 text-sm cursor-pointer"}
          >
            Leave Server
            <Trash className={"h-4 w-4 ml-auto"} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
