"use client";

import { useEffect, useState } from "react";

import { CreateChannelModal } from "@/src/widgets/modals/create-channel-modal";
import { CreateServerModal } from "@/src/widgets/modals/create-server-modal";
import { DeleteChannelModal } from "@/src/widgets/modals/delete-channel-modal";
import { DeleteServerModal } from "@/src/widgets/modals/delete-server-modal";
import { EditChannelModal } from "@/src/widgets/modals/edit-channel-modal";
import { EditServerModal } from "@/src/widgets/modals/edit-server-modal";
import { InviteModal } from "@/src/widgets/modals/invite-modal";
import { LeaveServerModal } from "@/src/widgets/modals/leave-server-modal";
import { MembersModal } from "@/src/widgets/modals/members-modal";
import { MessageFileModal } from "@/src/widgets/modals/message-file-modal";

// TODO возможно заменить эту логику на динмическу компоненту
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
    </>
  );
};
