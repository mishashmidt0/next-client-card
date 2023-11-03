import {useMutation} from "@tanstack/react-query";
import {creatCard} from "@/src/feature/create-pack-form/api";


export default function useCreateCard(){
 return useMutation({
     mutationFn: (formData:FormData) => creatCard(formData),
 })
}

