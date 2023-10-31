import useCreateCard from "@/src/feature/create-pack-form/mutate";
import Input from "@/src/shared/ui/Input";
import {ChangeEvent, useState} from "react";
import Button from "@/src/shared/ui/Button";


//TODO отправлять Имя героя на бэк вмекте с файлом
//TODO при успехе выводить алерт
//TODO при загрузке лоадер

export default function CreatePackForm() {
    const [value, setValue] = useState<string>()
    const [file, setFile] = useState<File>()
    const {mutate} = useCreateCard()

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onChangeFile = (e:ChangeEvent<HTMLInputElement>) => {
        if( e.target.files?.[0] ){
            setFile(e.target.files?.[0])
        }

    }

    const onSubmit = () =>{
        if(file && value){
            const formData = new FormData()
            formData.append("file", file);
            mutate({formData})
        }
    }


    return <div className={'flex flex-col gap-4'}>
        <Input value={value} onChange={onChangeHandler} placeholder={'имя карточки'}/>
        <input type="file" onChange={onChangeFile} accept={'image/*, .png, .jpg, .wepb'}/>

        <Button onClick={onSubmit} disabled={!file} text={'отправить'}/>
    </div>
}