import React from "react";

import { NavigationSidebar } from "@/src/widgets/navigation/navigation-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"h-full"}>
      <div
        className={
          "hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-8 top-0"
        }
      >
        <NavigationSidebar />
      </div>
      <main className={"md:pl-[72px] h-full"}>{children}</main>
    </div>
  );
};

export default MainLayout;
