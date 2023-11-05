import {useMutation} from "@tanstack/react-query";
import {login, register} from "./api";
import {IFormInput} from "./index";
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation'



export function useRegister(){
const routes =useRouter()

 return useMutation({
     mutationFn: (dto:IFormInput) => register(dto),
     onSuccess:({access_token})=>{
         localStorage.setItem('access_token',access_token)
         toast.success('Аккаунт создан')
         routes.back()
     }
 })
}

export function useLogin(){
    const routes =useRouter()

    return useMutation({
        mutationFn: (dto:IFormInput) => login(dto),
        onSuccess:({access_token})=>{
            localStorage.setItem('access_token',access_token)
            toast.success('Успешно')
            routes.back()
        }
    })
}