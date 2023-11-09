import Image from "next/image";

import { AvatarDemo } from "@/src/entity/avatar-default";
import cookies from "@/src/shared/lib/cookies-lib";
import Navigate from "@/src/widgets/navigate";

export default async function Home() {
  const { isAuth } = await cookies();

  return (
    <article className="prose lg:prose-xl flex flex-col items-center justify-between m-auto h-full">
      <AvatarDemo />
      <Navigate isAuth={isAuth} />
      <Image
        alt="travel"
        src="/bg.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        className={"-z-10"}
      />
    </article>
  );
}
