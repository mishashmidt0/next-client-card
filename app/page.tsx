"use client";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";


export default function Home() {
    const ref = useRef<any>()
    const [input, setInput] = useState('')
    const [socket, setSocket] = useState<any>('')

    useEffect(() => {
        socketInitializer()
    }, [])

    const socketInitializer = async () => {
        const socket =  io('http://localhost:3080')
        // setSocket(socket)
        ref.current = socket
        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('recMessage', (msg:string) => {
            setInput(msg)
        })
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        ref.current.emit('sendMessage', e.target.value)
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         Старт
        <input
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
        />
    </main>
  )
}
