"use server";
import { cookies } from "next/headers";

export default async function cookiesLib() {
  const accessToken = cookies().get("access_token");

  return {
    isAuth: !(accessToken == null),
  };
}
