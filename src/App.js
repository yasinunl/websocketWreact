import './App.css';
import {
  StompSessionProvider,
} from "react-stomp-hooks";
import { ChildComponent } from './ChildComponent';
import { PublishComponent } from './PublishComponent';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }
    const sessionID = makeid(10)
    localStorage.setItem("sessionID", sessionID)
  }, [])
  return (
    <div className="App">
      <StompSessionProvider url={'http://localhost:8080/ws-endpoint'} >
        <ChildComponent />
        <PublishComponent />
      </StompSessionProvider>
    </div>
  );
}

export default App;
