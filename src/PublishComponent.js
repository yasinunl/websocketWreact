import { useRef } from "react";
import {
    useStompClient,
} from "react-stomp-hooks";
export const PublishComponent = () => {
    const stompClient = useStompClient();
    const valuem = useRef(null);
    const sessionID = localStorage.getItem("sessionID");

    const publishMessage = () => {
        if (stompClient) {
            //stompClient.publish({destination: '/app/broadcast', body: valuem.current.value})
            //stompClient.publish({destination: '/app/user-message', body: valuem.current.value})
            stompClient.publish({ destination: '/app/user-message-' + valuem.current.value, body: 'Hello User ', headers: { "sessionID": sessionID } })
        }
    }
    return (<>
        <input ref={valuem} />
        <div onClick={publishMessage}> Send message </div></>
    )
}