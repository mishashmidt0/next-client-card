import { cn } from "@/src/shared/lib/utils";
import { Avatar, AvatarImage } from "@/src/shared/ui/avatar";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
