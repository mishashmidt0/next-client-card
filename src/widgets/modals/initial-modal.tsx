"use client";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/src/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/src/shared/ui/dialog";
import { FileUpload } from "@/src/shared/ui/file-upload";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Введите имя сервера",
  }),
  imageUrl: z.string().min(1, {
    message: "Обязательное поля для заполнения",
  }),
});

export const InitialModal = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
    console.log(values);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className={"bg-white text-black p-0 overflow-hidden"}>
        <DialogHeader className={"pt-8 px-6"}>
          <DialogTitle className={"text-2xl text-center font-bold"}>
            Настройте ваш сервер
          </DialogTitle>
          <DialogDescription className={"text-center text-zinc-500"}>
            Дайте вашему серверу персональное имя и аватарку. В будущем вы
            можете изменить эти данные
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
            <div className={"space-y-8 px-6 "}>
              <div className={"flex items-center justify-center text-center"}>
                <FormField
                  control={form.control}
                  name={"imageUrl"}
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          onChange={onChange}
                          value={value}
                          endpoint={"serverImage"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={
                        "uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      }
                    >
                      Название сервера
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder={"Введите название сервера"}
                        {...field}
                        disabled={isLoading}
                        className={
                          "bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={"name"}
              />
            </div>
            <DialogFooter className={"bg-gray-100 px-6 py-4"}>
              <Button disabled={isLoading} variant={"primary"}>
                Создать
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
