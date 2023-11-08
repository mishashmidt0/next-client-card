import cookies from "@/src/shared/lib/cookies-lib";
import Navigate from "@/src/widgets/navigate";

export default async function Home() {
  const { isAuth } = await cookies();

  console.log(isAuth);

  return (
    <article className="prose lg:prose-xl flex flex-col items-center justify-between m-auto h-full">
      <h1>Старт</h1>
      <Navigate isAuth={isAuth} />
    </article>
  );
}
