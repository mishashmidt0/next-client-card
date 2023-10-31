import useGetPack from "@/src/widgets/pack-list/model/query";
import {BASE_URL, ROOT_URL} from "@/src/shared/const/api-const";
import Image from "next/image";

// TODO Сохранять изображения на бэке и выдавать их ссылку
export default function PackList(){
    const {data} = useGetPack()


    return <div>
        {data?.map(({filename,url}, index) => <div key={index} className={'flex flex-col gap-4'}>
            <Image src={BASE_URL +"/"+ url} alt={filename} width={200} height={200}/>
            <p>{filename}</p>
        </div>)}

    </div>
}