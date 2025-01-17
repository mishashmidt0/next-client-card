"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { EmojiPicker } from "@/src/feature/emoji-picker";
import { useModal } from "@/src/shared/hooks/use-modal-store";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, type, name }: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(apiUrl, values, {
        params: {
          ...query,
        },
      });
      form.reset();
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name={"content"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type={"button"}
                    onClick={() => {
                      onOpen("messageFile", { apiUrl, query });
                    }}
                    className={
                      "absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                    }
                  >
                    <Plus className={"text-white dark:text-[#313338]"} />
                  </button>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className={
                      "px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    }
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                  />
                  <div className={"absolute top-7 right-8"}>
                    <EmojiPicker
                      onChange={(emojy: string) => {
                        field.onChange(`${field.value}${emojy}`);
                      }}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
