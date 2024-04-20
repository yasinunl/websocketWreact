import { useState } from "react";
import {
    useSubscription,
} from "react-stomp-hooks";
export const ChildComponent = () => {
    const sessionID = localStorage.getItem("sessionID");
    const [message, setMessage] = useState("");
    // Subscribe to the topic that we have opened in our spring boot app
    //useSubscription('/topic/reply', (message) => {setMessage(message.body)});
    //useSubscription('/user/queue/reply', (message) => {setMessage(message.body)});
    console.log(window.localStorage.getItem('sessionId'))
    useSubscription('/queue/reply-' + sessionID, (message) => { setMessage(message.body) });
    return (
        <div> The broadcast message from websocket broker is {message}</div>
    )
}