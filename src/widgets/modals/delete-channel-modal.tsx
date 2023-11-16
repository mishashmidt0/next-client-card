import { useState } from "react";

import { DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useModal } from "@/src/shared/hooks/use-modal-store";
import { Button } from "@/src/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/src/shared/ui/dialog";

export const DeleteChannelModal = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { server, channel } = data;
  const isModalOpen = isOpen && type === "deleteChannel";

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/channels/${channel?.id}`, {
        params: {
          serverId: server?.id,
        },
      });
      onClose();
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={"bg-white text-black p-0 overflow-hidden"}>
        <DialogHeader className={"pt-8 px-6"}>
          <DialogTitle className={"text-2xl text-center font-bold"}>
            Удалить комнату
          </DialogTitle>
          <DialogDescription>
            Вы уверены что хотите удалить{" "}
            <span className={"font-semibold text-indigo-500"}>
              #{channel?.name}
            </span>{" "}
            комнату ? <br />
            Данные комнаты будут потеряны навсегда
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={"bg-gray-100 px-6 py-4 "}>
          <div className={"flex items-center justify-between w-full"}>
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Отмена
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant={"primary"}>
              Сохранить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
