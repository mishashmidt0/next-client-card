import {useMutation} from "@tanstack/react-query";
import {creatCard} from "@/src/feature/create-pack-form/api";
import toast from "react-hot-toast";


export default function useCreateCard(){
 return useMutation({
     mutationFn: (formData:FormData) => creatCard(formData),
     onSuccess:()=>{
         toast.success('Колода создана')
     }
 })
}

