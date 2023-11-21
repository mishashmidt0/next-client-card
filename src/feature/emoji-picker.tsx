"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { PopoverContent } from "@radix-ui/react-popover";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";

import { Popover, PopoverTrigger } from "@/src/shared/ui/popover";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile
          className={
            "text-zinc-500 dark:text-zinc-400 hover:text-zinc-300 dark:hover:text-zinc-300 transition"
          }
        />
      </PopoverTrigger>
      <PopoverContent
        side={"right"}
        sideOffset={40}
        className={
          "bg-transparent border-none shadow-none drop-shadow-none mb-16"
        }
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emojy: any) => {
            onChange(emojy.native);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
