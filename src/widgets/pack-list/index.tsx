import useGetPack from "@/src/widgets/pack-list/model/query";
import Card from "@/src/entity/card";

// TODO Сохранять изображения на бэке и выдавать их ссылку
export default function PackList(){
    const {data} = useGetPack()


    return <div className={'grid grid-cols-6 gap-12'}>
            {data?.map(({ url ,name}, index) => <Card key={index} url={url} name={name}/>)}
    </div>
}