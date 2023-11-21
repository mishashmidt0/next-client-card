import { Menu } from "lucide-react";

import { Button } from "@/src/shared/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/shared/ui/sheet";
import { NavigationSidebar } from "@/src/widgets/navigation/navigation-sidebar";
import { ServerSidebar } from "@/src/widgets/server/server-sidebar";
interface MobileToggleProps {
  serverId: string;
}
export const MobileToggle = ({ serverId }: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className={"md:hidden"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className={"p-0 flex gap-0"}>
        <div className={"w-[72px]"}>
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};
