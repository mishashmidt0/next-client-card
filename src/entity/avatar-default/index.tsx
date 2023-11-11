import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";

export function AvatarDemo() {
  return (
    <Avatar className={"h-10 w-10"}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
