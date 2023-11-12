import { useCallback, useEffect, useRef } from "react";

import { type DefaultEventsMap } from "@socket.io/component-emitter";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { type Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { queryKey } from "@/src/shared/lib/query-key";
import { type Msg } from "@/src/widgets/chat/model/type";

export function useSocket() {
  const client = useQueryClient();
  const userNameRef = useRef<string | null>();
  const params = useParams();
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const socketInitializer = useCallback(async () => {
    const socket = io("http://localhost:3080");

    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on(`recMessage-${params.id as string}`, (payload: string) => {
      console.log("res");
      const data = JSON.parse(payload) as Msg;

      client.setQueryData(queryKey("allMessage"), (oldData: Msg[]) => [
        ...oldData,
        data,
      ]);
    });
  }, [client, params.id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");

      if (!user) {
        userNameRef.current = uuidv4();
        localStorage.setItem("user", userNameRef.current);
      } else {
        userNameRef.current = user;
      }
      void socketInitializer().then();
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [socketInitializer]);

  return {
    userNameRef,
    roomId: params.id,
    socketRef,
  };
}
