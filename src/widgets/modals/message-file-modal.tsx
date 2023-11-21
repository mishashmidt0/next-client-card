"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useModal } from "@/src/shared/hooks/use-modal-store";
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
import { Form, FormControl, FormItem, FormField } from "@/src/shared/ui/form";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Обязательное поля для заполнения",
  }),
});

export const MessageFileModal = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "messageFile";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      apiUrl &&
        (await axios.post(
          apiUrl,
          { ...values, content: values.fileUrl },
          {
            params: { ...query },
          },
        ));
      form.reset();

      router.refresh();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className={"bg-white text-black p-0 overflow-hidden"}>
        <DialogHeader className={"pt-8 px-6"}>
          <DialogTitle className={"text-2xl text-center font-bold"}>
            Прикрепить файл
          </DialogTitle>
          <DialogDescription className={"text-center text-zinc-500"}>
            Отправить файл как сообщение
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
            <div className={"space-y-8 px-6 "}>
              <div className={"flex items-center justify-center text-center"}>
                <FormField
                  control={form.control}
                  name={"fileUrl"}
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          onChange={onChange}
                          value={value}
                          endpoint={"messageFile"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
