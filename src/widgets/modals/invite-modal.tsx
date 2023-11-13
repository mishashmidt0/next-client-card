import { useState } from "react";

import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";

import { useModal } from "@/src/shared/hooks/use-modal-store";
import { useOrigin } from "@/src/shared/hooks/use-origin";
import { Button } from "@/src/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/src/shared/ui/dialog";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";

export const InviteModal = () => {
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    void navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", { server: res.data });
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
            Пригласить Друга
          </DialogTitle>
        </DialogHeader>
        <div className={"p-6"}>
          <Label
            className={
              "uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
            }
          >
            Server link
          </Label>
          <div className={"flex items-center mt-2 gap-x-2"}>
            <Input
              readOnly
              disabled={isLoading}
              value={inviteUrl}
              className={
                "bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              }
            />
            <Button onClick={onCopy} size={"icon"} disabled={isLoading}>
              {copied ? (
                <Check className={"w-4 h-4"} />
              ) : (
                <Copy className={"w-4 h-4"} />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            variant={"link"}
            className={"text-xs text-zinc-500 mt-4"}
            size={"sm"}
            onClick={onNew}
          >
            Generate new link
            <RefreshCw className={"h-4 w-4 ml-2"} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
