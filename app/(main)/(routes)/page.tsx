import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

import cookies from "@/src/shared/lib/cookies-lib";
import Navigate from "@/src/widgets/navigate";

export default async function Home() {
  const { isAuth } = await cookies();

  return (
    <div className={"flex flex-col items-center gap-40 p-24"}>
      <UserButton afterSignOutUrl="/" />
      <Navigate isAuth={isAuth} />
    </div>
  );
}
