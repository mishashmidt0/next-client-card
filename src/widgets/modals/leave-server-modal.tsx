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

export const LeaveServerModal = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { server } = data;
  const isModalOpen = isOpen && type === "leaveServer";

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);
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
            Покинуть сервер
          </DialogTitle>
          <DialogDescription>
            Вы уверены что хотите покинуть{" "}
            <span className={"font-semibold text-indigo-500"}>
              {server?.name}
            </span>{" "}
            сервер
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={"bg-gray-100 px-6 py-4 "}>
          <div className={"flex items-center justify-between w-full"}>
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Отмена
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant={"primary"}>
              Подтвердить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
