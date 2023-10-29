import {ChangeEvent, useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";
import {useParams} from 'next/navigation'
import crypto from "crypto";
import useGetAllMessage from "@/src/widgets/chat/model/query";


export default function Chat  (){
    const d = useGetAllMessage()
    const userRef = useRef<string | null>()
    const params = useParams()
    const ref = useRef<any>()
    const [input, setInput] = useState('')
    useEffect(() => {
        const user = localStorage.getItem('user')
        if(!user){
            userRef.current = crypto.randomBytes(20).toString('hex')
            localStorage.setItem('user', userRef.current)
        } else {
            userRef.current = user
        }
        socketInitializer()
    }, [])


    const socketInitializer = async () => {
        const socket =  io('http://localhost:3080')
        ref.current = socket
        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on(`recMessage-${params.id}`, (msg:string) => {
            setInput(msg)
        })
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    const handleClick = () =>{
        ref.current.emit('sendMessage', {msg:input, roomId:params.id, user: userRef.current})
    }

    return <div className={'space-y-4'}>
        <div>
            {/*{data?.map(({id,msg}) => <p key={id}>{msg}</p>)}*/}
        </div>

        <div className={'space-x-4'}>
            <input
                className={'text-black'}
                type={'text'}
                value={input}
                onChange={onChangeHandler}
            />
            <button onClick={handleClick}>отправить</button>
        </div>
    </div>
}