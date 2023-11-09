"use client";
import { type ChangeEvent, type KeyboardEvent, useState } from "react";

import { useSocket } from "@/src/shared/hooks/soket";
import cc from "@/src/shared/lib/classcat";
import { Button } from "@/src/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/src/shared/ui/card";
import { Input } from "@/src/shared/ui/input";
import { Skeleton } from "@/src/shared/ui/skeleton";
import useGetAllMessage from "@/src/widgets/chat/model/query";

// TODO скролл не опускаеться вниз после написания текста
// TODO скролл в чате
// TODO почему сообщение отправляеться мне же
// TODO выводить чат конкретной комнаты

export default function Chat() {
  const { data } = useGetAllMessage();
  const { userNameRef, roomId, socketRef } = useSocket();
  const [input, setInput] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    socketRef.current?.emit("sendMessage", {
      msg: input,
      roomId,
      user: userNameRef.current,
    });
    setInput("");
  };
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const isPending = true;

  return (
    <Card className={"fixed left-5 bottom-10 bg-zinc-100"}>
      <CardContent className={"flex flex-col max-h-[300px] overflow-y-auto"}>
        {!isPending &&
          data?.map(({ id, msg, user }) => (
            <p
              key={id}
              className={cc([
                "ml-2",
                { "text-end": user === userNameRef.current },
              ])}
            >
              {msg}
            </p>
          ))}
        {isPending && <Skeleton className="rounded-md h-[300px]" />}
      </CardContent>
      <CardFooter className={"justify-center pt-2"}>
        <Input value={input} onChange={onChangeHandler} onKeyDown={handleKey} />
        <Button onClick={sendMessage}>отправить</Button>
      </CardFooter>
    </Card>
  );
}
