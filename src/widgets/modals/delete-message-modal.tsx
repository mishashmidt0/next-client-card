import { useState } from "react";

import { DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";

import { useModal } from "@/src/shared/hooks/use-modal-store";
import { Button } from "@/src/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/src/shared/ui/dialog";

export const DeleteMessageModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "deleteMessage";

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(apiUrl ?? "", {
        params: query,
      });
      onClose();
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
            Удалить сообщение
          </DialogTitle>
          <DialogDescription>
            Вы уверены что хотите удалить это собщение ? <br />
            Это сообщение будет удалено навегда.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={"bg-gray-100 px-6 py-4 "}>
          <div className={"flex items-center justify-between w-full"}>
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Отмена
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant={"destructive"}
            >
              Удалить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
