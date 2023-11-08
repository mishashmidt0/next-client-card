"use client";
import { useState } from "react";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { useRegister, useLogin } from "@/src/feature/auth-form/mutation";
import Input from "@/src/shared/ui/Input";

export interface IFormInput {
  email: string;
  password: string;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { control, handleSubmit } = useForm<IFormInput>({});
  const register = useRegister();
  const login = useLogin();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    !isLogin ? register.mutate(data) : login.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"space-y-4 space-x-4"}>
      <p>{isLogin ? "Войти" : "Зарегистрироваться"}</p>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, ...other } }) => (
          <Input {...other} value={value || ""} placeholder={"Почта"} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, ...other } }) => (
          <Input {...other} value={value || ""} placeholder={"Пароль"} />
        )}
      />

      <button className={"bg-green-200 p-2"}>
        {isLogin ? "Войти" : "Зарегистрироваться"}
      </button>
      <button
        className={"p-2"}
        type={"button"}
        onClick={() => {
          setIsLogin((prev) => !prev);
        }}
      >
        {!isLogin ? "Войти" : "Зарегистрироваться"}
      </button>
    </form>
  );
}
