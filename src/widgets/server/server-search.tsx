"use client";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/shared/ui/command";

interface ServerSearchProps {
  data: Array<{
    label: string;
    type: "channel" | "member";
    data:
      | Array<{
          icon: React.ReactNode;
          name: string;
          id: string;
        }>
      | undefined;
  }>;
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);
    if (type === "member") {
      router.push(`/server/${params?.serverId as string}/conversations/${id}`);
    }

    if (type === "channel") {
      router.push(`/server/${params?.serverId as string}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className={
          "group px-2 py-2 w-full rounded-md flex items-center  gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        }
      >
        <Search className={"w-4 h-4 text-zinc-500 dark:text-zinc-400"} />
        <p
          className={
            "font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
          }
        >
          Поиск
        </p>
        <kbd
          className={
            "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
          }
        >
          <span className={"text-xs"}>CTRL</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={"Поиск по комнатам и участникам"} />
        <CommandList>
          <CommandEmpty>Нет результата</CommandEmpty>
          {data.map(({ data, type, label }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ icon, name, id }) => (
                  <CommandItem
                    key={id}
                    className={"flex items-center"}
                    onSelect={() => {
                      onClick({ id, type });
                    }}
                  >
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
