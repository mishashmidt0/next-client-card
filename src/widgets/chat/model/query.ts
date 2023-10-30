import { getMessage } from "@/src/shared/query/chat";
import {useQuery} from "@tanstack/react-query";
import {queryKey} from "@/src/shared/lib/query-key";


export default function useGetAllMessage(){
 return useQuery({
     queryFn: () => getMessage(),
     queryKey: queryKey('allMessage')
 })
}

