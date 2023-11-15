import { ChannelType } from ".prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useModal } from "@/src/shared/hooks/use-modal-store";
import { Button } from "@/src/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/src/shared/ui/dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Введите название комнаты",
    })
    .refine((name) => name !== "general", {
      message: 'Channel name cannot be "general"',
    }),
  type: z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/channels", values, {
        params: {
          serverId: params?.serverId,
        },
      });
      form.reset();
      router.refresh();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className={"bg-white text-black p-0 overflow-hidden"}>
        <DialogHeader className={"pt-8 px-6"}>
          <DialogTitle className={"text-2xl text-center font-bold"}>
            Создание комнаты
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
            <div className={"space-y-8 px-6 "}>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={
                        "uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      }
                    >
                      Название комнаты
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder={"Введите название комнаты"}
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
              />

              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип комнаты</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={
                            "bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                          }
                        >
                          <SelectValue placeholder={"Выберите тип комнаты"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {Object.values(ChannelType)?.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className={"capitalize"}
                            >
                              {type.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
                name={"type"}
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
