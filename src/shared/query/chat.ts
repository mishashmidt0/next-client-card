import {ROOT_URL} from "@/src/shared/const/api-const";
import {Msg} from "@/src/widgets/chat/model/type";

export async function getMessage():Promise<Msg[]> {
    const res = await fetch(`${ROOT_URL.api}/chat` )

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return await res.json()
}