import Image from "next/image";
import {BASE_URL} from "@/src/shared/const/api-const";
import {useState} from "react";
import Button from "@/src/shared/ui/Button";
interface Props {
    url:string
    name:string
}
export default function Card({url,name}:Props){
    const [isVisible, setIsVisible] = useState(true)


    return <div  className={' flex flex-col gap-4 items-center justify-between overflow-hidden'}>
        <div className={'relative'}>
            <Image src={isVisible?`${BASE_URL +"/"+ url}` : '/not.png' } alt={'mimetype'} className={'aspect-square object-cover'} width={180} height={180}/>
            <Button onClick={()=>setIsVisible(prev=> !prev)} className={'absolute bottom-2 right-[50%] translate-x-1/2'} text={isVisible? 'скрыть':'показать'}/>
        </div>
        <p className={'truncate'}>{name}</p>
    </div>
}