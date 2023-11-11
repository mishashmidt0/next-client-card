import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { login, register } from "@/src/feature/auth-form/api";
import { type IFormInput } from "@/src/feature/auth-form/index";

export function useRegister() {
  const routes = useRouter();

  return useMutation({
    mutationFn: async (dto: IFormInput) => await register(dto),
    onSuccess: ({ access_token: accessToken }) => {
      localStorage.setItem("access_token", accessToken);
      toast.success("Аккаунт создан");
      routes.back();
    },
  });
}

export function useLogin() {
  const routes = useRouter();

  return useMutation({
    mutationFn: async (dto: IFormInput) => await login(dto),
    onSuccess: ({ access_token: accessToken }) => {
      localStorage.setItem("access_token", accessToken);
      toast.success("Успешно");
      routes.back();
    },
  });
}
