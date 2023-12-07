
import './App.css';
import io from 'socket.io-client'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LobbyPage from './Pages/LobbyPage';
import CodeBlockPage from './Pages/CodeBlockPage';


const socket = io.connect('https://homeassignmentserver-production.up.railway.app');

function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route index element = {<LobbyPage socket={socket}/>}></Route>
      <Route path="/lobby" element = {<LobbyPage socket={socket}/>}></Route>
      <Route path="/codeblock/:id" element = {<CodeBlockPage  socket={socket}/>}></Route>

     </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
