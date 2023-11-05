import {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import useGetAllMessage from "@/src/widgets/chat/model/query";
import {useSocket} from "@/src/shared/hooks/soket";
import Input  from "@/src/shared/ui/Input";
import Button from "@/src/shared/ui/Button";
import cc from "@/src/shared/lib/classcat";


//TODO скролл не опускаеться вниз после написания текста
//TODO скролл в чате
//TODO почему сообщение отправляеться мне же
//TODO выводить чат конкретной комнаты

export default function Chat  (){
    const divRef = useRef<HTMLDivElement | null>(null)
    const { data } = useGetAllMessage()
    const { userNameRef, roomId, socketRef } = useSocket()
    const [input, setInput] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const sendMessage = () =>{
        socketRef.current &&  socketRef.current.emit('sendMessage', {msg:input, roomId, user: userNameRef.current})
        setInput('')
    }
    const handleKey = (e:KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === 'Enter'){
            sendMessage()
        }
}


    return <div className={'flex flex-col justify-end grow bg-green-200'}>
            <div className={'sticky bottom-10 space-y-4'}>
        <div className={'max-h-[70vh] overflow-y-scroll  px-2 relative scroll-smooth'} ref={divRef}>
                {data?.map(({id,msg,user}) => <p key={id} className={cc(['ml-2', {'text-end': user === userNameRef.current }])}>{msg}</p>)}
        </div>

        <div className={'space-x-4 flex '}>
                <Input
                    value={input}
                    onChange={onChangeHandler}
                    onKeyDown={handleKey}
                />
            <Button onClick={sendMessage} text={'отправить'}/>
        </div>
    </div>
    </div>
}