"use server";
import cookies from "@/src/shared/lib/cookies-lib";
import Navigate from "@/src/widgets/navigate";

export default async function Home() {
  const { isAuth } = await cookies();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Старт</h1>
      <Navigate isAuth={isAuth} />
    </main>
  );
}
