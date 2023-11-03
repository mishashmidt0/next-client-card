import {ROOT_URL} from "@/src/shared/const/api-const";
import {Msg} from "@/src/widgets/chat/model/type";

export async function creatCard(formData:FormData):Promise<string> {
    const res = await fetch(`${ROOT_URL.api}/pack`,{
        method:'POST',
        body: formData,
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return await res.json()
}