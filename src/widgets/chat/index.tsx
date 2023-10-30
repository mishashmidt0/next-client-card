import {ChangeEvent, KeyboardEvent, useState} from "react";
import useGetAllMessage from "@/src/widgets/chat/model/query";
import {useSocket} from "@/src/shared/hooks/soket";
import cc from "@/src/shared/lib/classcat";
import Input from "@/src/shared/ui/Input";
import Button from "@/src/shared/ui/Button";

export default function Chat  (){
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
    return <div className={'absolute left-10 bottom-10 space-y-4'}>
        <div>
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