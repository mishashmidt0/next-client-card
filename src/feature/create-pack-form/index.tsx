import useCreateCard from "@/src/feature/create-pack-form/mutate";
import { Input } from "@/src/shared/ui/Input";

import {Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    title: string;
    file: File;
}


//TODO отправлять Имя героя на бэк вмекте с файлом
//TODO при успехе выводить алерт
//TODO при загрузке лоадер

export default function CreatePackForm() {
    const {mutate} = useCreateCard()

    const { control, handleSubmit,watch } = useForm<IFormInput>({

    })

    const onSubmit: SubmitHandler<IFormInput>  = ({title,file}) =>{
            const formData = new FormData()
            formData.append("avatar", file);
            formData.append('title', title);
            mutate(formData)
    }
    console.log(watch())
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                render={({ field:{value, ...other} }) => <Input {...other} value={value || ''}/>}
            />
            <Controller
                name="file"
                control={control}
                render={({ field:{value, onChange, ...other} }) => (
                    <input {...other} type="file" value={(value as File)?.name || ''} onChange={(e)=> onChange(e.target.files?.[0])}  accept={'image/*, .png, .jpg, .wepb'} />
                )}
            />
            <input type="submit" />
        </form>
    )
}