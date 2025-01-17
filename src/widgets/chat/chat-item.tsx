"use client";

import { useEffect, useState } from "react";

import { MemberRole } from ".prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Member, type Profile } from "@prisma/client";
import axios from "axios";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ActionTooltip } from "@/src/entity/action-tooltip";
import { UserAvatar } from "@/src/entity/user-avatar";
import { useModal } from "@/src/shared/hooks/use-modal-store";
import { cn } from "@/src/shared/lib/utils";
import { Button } from "@/src/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className={"h-4 w-4 ml-2 text-indigo-500"} />,
  ADMIN: <ShieldAlert className={"h-4 w-4 ml-2 text-rose-500"} />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatItem = ({
  content,
  currentMember,
  member,
  deleted,
  fileUrl,
  socketUrl,
  socketQuery,
  isUpdated,
  timestamp,
  id,
}: ChatItemProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;

  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;

  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`${socketUrl}/${id}`, values, {
        params: socketQuery,
      });

      form.reset();
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }
    router.push(
      `/servers/${params?.serverId as string}/conversations/${member.id}`,
    );
  };

  useEffect(() => {
    form.reset({
      content,
    });
  }, [content, form]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={
        "relative group flex items-center hover:bg-black/5 p-4 transition w-full"
      }
    >
      <div className={"group flex gap-x-2 items-center w-full"}>
        <div
          onClick={onMemberClick}
          className={"cursor-pointer hover:drop-shadow-md transition"}
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>

        <div className={"flex flex-col w-full"}>
          <div className={"flex items-center gap-x-2"}>
            <div className={"flex items-center"}>
              <p
                onClick={onMemberClick}
                className={
                  "cursor-pointer font-semibold text-sm hover:underline"
                }
              >
                {member.profile.name}
              </p>

              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className={"text-xs text-zinc-500 dark:text-zinc-400"}>
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target={"_blank"}
              rel={"noopener noreferrer"}
              className={
                "relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
              }
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                sizes={"w-48"}
                className={"object-cover"}
              />
            </a>
          )}
          {isPDF && (
            <div
              className={
                "relative flex items-center p-2 mt-2 rounded-md bg-background/10"
              }
            >
              <FileIcon
                className={"h-10 w-10 fill-indigo-200 stroke-indigo-400"}
              />
              <a
                href={fileUrl}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={
                  "ml-2 text-indigo-500 text-sm dark:text-indigo-400 hover:underline"
                }
              >
                PDF file
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1",
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span
                  className={
                    "text-[10px] mx-2 text-zinc-500 dark:text-zinc-400"
                  }
                >
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className={"flex items-center w-full gap-x-2 pt-2"}
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={"flex-1"}>
                      <FormControl>
                        <div className={"relative w-full"}>
                          <Input
                            placeholder="Edited message"
                            className={
                              "p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            }
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                  name={"content"}
                />
                <Button size={"sm"} variant={"primary"}>
                  Save
                </Button>
              </form>
              <span className={"text-[10px] mt-1 text-zinc-400"}>
                Press escape to cancel, enter save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div
          className={
            "hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm"
          }
        >
          {canEditMessage && (
            <ActionTooltip label={"Delete"}>
              <Edit
                onClick={() => {
                  setIsEditing(true);
                }}
                className={
                  "cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                }
              />
            </ActionTooltip>
          )}
          <ActionTooltip label={"Deleted"}>
            <Trash
              onClick={() => {
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                });
              }}
              className={
                "cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              }
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
