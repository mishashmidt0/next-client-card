import {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import useGetAllMessage from "@/src/widgets/chat/model/query";
import {useSocket} from "@/src/shared/hooks/soket";
import cc from "@/src/shared/lib/classcat";
import Input from "@/src/shared/ui/Input";
import Button from "@/src/shared/ui/Button";


//TODO скролл не опускаеться вниз после написания текста
//TODO скролл в чате
//TODO почему сообщение отправляеться мне же

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


    return <div className={'sticky bottom-10 space-y-4 min-w-[350px]'}>
        <div className={'max-h-[400px] overflow-y-scroll  px-2 relative scroll-smooth'} ref={divRef}>
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
}