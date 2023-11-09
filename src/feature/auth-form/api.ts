import { type IFormInput } from "@/src/feature/auth-form/index";

import { ROOT_URL } from "@/src/shared/const/api-const";

export async function register(
  dto: IFormInput,
): Promise<{ access_token: string }> {
  const res = await fetch(`${ROOT_URL.api}/auth/register`, {
    method: "POST",
    body: JSON.stringify(dto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
export async function login(
  dto: IFormInput,
): Promise<{ access_token: string }> {
  const res = await fetch(`${ROOT_URL.api}/auth/login`, {
    method: "POST",
    body: JSON.stringify(dto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
