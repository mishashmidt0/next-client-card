import {useMutation} from "@tanstack/react-query";
import {creatCard} from "@/src/feature/create-pack-form/api";

interface Props {
    formData:FormData
}
export default function useCreateCard(){
 return useMutation({
     mutationFn: ({formData}:Props) => creatCard({formData}),
 })
}

