import { useRef } from "react";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import useCreateCard from "@/src/feature/create-pack-form/mutate";
import { Input } from "@/src/shared/ui/input";

interface IFormInput {
  title: string;
  file: File;
}

// TODO отправлять Имя героя на бэк вмекте с файлом
// TODO при успехе выводить алерт
// TODO при загрузке лоадер

export default function CreatePackForm() {
  const { mutate } = useCreateCard();

  const { control, handleSubmit } = useForm<IFormInput>({});
  const onSubmit: SubmitHandler<IFormInput> = ({ title, file }) => {
    const formData = new FormData();

    formData.append("avatar", file);
    formData.append("title", title);
    mutate(formData);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handelClick = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"space-y-4"}>
      <Controller
        name="file"
        control={control}
        render={({ field: { value, onChange, ref, ...other } }) => (
          <div className={"flex justify-between  gap-2 items-center"}>
            <input
              className={"hidden"}
              {...other}
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
              type="file"
              value=""
              onChange={(e) => {
                onChange(e.target.files?.[0]);
              }}
              accept={"image/*, .png, .jpg, .wepb"}
            />
            <p>{value?.name || "выберите фото"}</p>
            <button
              onClick={handelClick}
              className={"bg-green-200 p-2"}
              type={"button"}
            >
              Выбрать
            </button>
          </div>
        )}
      />
      <Controller
        name="title"
        control={control}
        render={({ field: { value, ...other } }) => (
          <Input
            {...other}
            value={value || ""}
            placeholder={"Название колоды"}
          />
        )}
      />
      <button className={"bg-green-200 p-2"}>Сохранить</button>
    </form>
  );
}
