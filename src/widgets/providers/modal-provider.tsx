"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/src/widgets/modals/create-server-modal";
import { EditServerModal } from "@/src/widgets/modals/edit-server-modal";
import { InviteModal } from "@/src/widgets/modals/invite-modal";
import { MembersModal } from "@/src/widgets/modals/members-modal";

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
    </>
  );
};
