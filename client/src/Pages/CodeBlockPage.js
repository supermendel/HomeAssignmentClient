
import TextField from '@mui/material/TextField';
import io from 'socket.io-client';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CodeBlockPage.css';
import Editor from '@monaco-editor/react';



function CodeBlockPage({socket}) {

  let { id } = useParams();
  const[dataObject,setDataObject]=useState([]);
  const[code,setCode]=useState("");
  const[codeReceived,setCodeReceived] = useState("");
  const[isMentor,setIsMentor] = useState(false);
 

  
  useEffect(()=>{ 
    console.log(`${id}`);
    fetch(`http://localhost:5000/codeblock/${id}`)
    .then(response => response.json())
    .then(data => setDataObject(data)) 
    .catch(error => console.error('Error fetching code blocks:', error));
    
   //calls when user entered the room
    socket.emit('enter-page', {id})
     socket.on('enter-page' ,(isFirst)=>{
      console.log(isFirst);
       setIsMentor(isFirst);
    }) 
      return ()=>{
        //socket.off('role-assigned');
        socket.off('enter-page');
      } 
    
    
    
  },[]);
    
  socket.on('code-received',(code)=>{
    setCodeReceived(code);
  })
 
  
  useEffect(()=>{
    socket.emit('code-update',{ code ,id});
  },[code]);

  //using monaco editor
  return (
    <div>
     <h1>
      {dataObject.title}</h1>
     
       
      <div className="monaco-editor-container">
      <Editor
        width="100%"
        height="100vh" 
        language="javascript" 
        theme="vs-dark" 
        options={{
          readOnly: isMentor,
          minimap: {
            enabled: false,
          },
        }}
        value={codeReceived}
        onChange={(value) => {
          setCode(value);
        }}
      />
    </div>
   </div>
  )
}

export default CodeBlockPage