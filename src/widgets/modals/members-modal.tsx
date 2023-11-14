import { useState } from "react";

import { type Server, type MemberRole } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { UserAvatar } from "@/src/entity/user-avatar";
import { useModal } from "@/src/shared/hooks/use-modal-store";
import plural from "@/src/shared/lib/plural";
import { type ServerWithMembersWithProfiles } from "@/src/shared/types/server";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/src/shared/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/src/shared/ui/dropdown-menu";
import { ScrollArea } from "@/src/shared/ui/scroll-area";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className={"h-4 w-4   text-indigo-500"} />,
  ADMIN: <ShieldAlert className={"h-4 w-4  text-rose-500"} />,
};

export const MembersModal = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: Server & ServerWithMembersWithProfiles };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });
      const res = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: res.data });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      const res = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: res.data });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={"bg-white text-black overflow-hidden"}>
        <DialogHeader className={"pt-8 px-6"}>
          <DialogTitle className={"text-2xl text-center font-bold"}>
            Управление участниками
          </DialogTitle>
          <DialogDescription className={"text-center text-zinc-500"}>
            {plural(
              server?.members?.length || 0,
              "%Участник",
              "%Участника",
              "%Участников",
            )}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className={"mt-8 max-h-[420px] pr-6"}>
          {server?.members?.map((member) => (
            <div key={member.id} className={"flex items-center gap-x-2 mb-6"}>
              <UserAvatar src={member.profile.imageUrl} />
              <div className={"flex flex-col gap-y-1"}>
                <div
                  className={"text-xs font-semibold flex items-center gap-x-1"}
                >
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className={"text-xs text-zinc-500"}>
                  {member.profile.email}
                </p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className={"ml-auto"}>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className={"h-5 w-5 text-zinc-500"} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side={"left"}>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger
                            className={"flex items-center"}
                          >
                            <ShieldQuestion className={"w-4 h-4 mr-2"} />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={async () => {
                                  await onRoleChange(member.id, "GUEST");
                                }}
                              >
                                <Shield className={"h-4 w-4 mr-2"} />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className={"h-4 w-4 ml-auto"} />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={async () => {
                                  await onRoleChange(member.id, "MODERATOR");
                                }}
                              >
                                <ShieldCheck className={"h-4 w-4 mr-2"} />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className={"h-4 w-4 ml-auto"} />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={async () => {
                            await onKick(member.id);
                          }}
                        >
                          <Gavel className={"mr-2 h-4 w-4"} />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2
                  className={"animate-spin text-zinc-500 ml-auto h-4 w-4"}
                />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
