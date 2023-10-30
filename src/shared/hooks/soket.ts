import {useEffect, useRef} from "react";
import crypto from "crypto";
import {Socket, io} from "socket.io-client";
import {useParams} from "next/navigation";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {useQueryClient} from "@tanstack/react-query";
import {queryKey} from "@/src/shared/lib/query-key";
import {Msg} from "@/src/widgets/chat/model/type";

export function useSocket(){
    const client = useQueryClient()
    const userNameRef = useRef<string | null>()
    const params = useParams()
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>()

    const socketInitializer = async () => {
        const socket =  io('http://localhost:3080')
        socketRef.current = socket
        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on(`recMessage-${params.id}`, (payload:string) => {
            console.log('res')
            const data = JSON.parse(payload) as Msg
            client.setQueryData(queryKey('allMessage'), (oldData: Msg[])=> [...oldData, data] )
        })
    }

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const user = localStorage.getItem('user')
            if(!user){
                userNameRef.current = crypto.randomBytes(20).toString('hex')
                localStorage.setItem('user', userNameRef.current)
            } else {
                userNameRef.current = user
            }
            socketInitializer()
        }
        return () =>{
            socketRef.current?.disconnect()
        }
    }, [])

    return {
         userNameRef,
        roomId: params.id,
        socketRef,
    }
}