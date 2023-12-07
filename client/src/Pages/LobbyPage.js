
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './LobbyPage.css';
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react';

const LobbyPage = ({socket}) => {
   const [dataObject,setDataObject]=useState([]);
    
    useEffect(()=>{
      
        fetch('https://homeassignmentserver-production.up.railway.app/lobby')
        .then(response =>  response.json())
        .then(data => setDataObject(data)) 
        .catch(error => console.error('Error fetching code blocks:', error));
    },[])
     

    
    return ( 
        <div className="lobbypage">
            <div className="content">
                <h1>Lobby Page</h1>
            <div className='buttons'>
            <Stack alignSelf={'center'} spacing={4} direction="row">
               {dataObject.map((blockCard,index)=>{
                 return<Link
                  to = {`/codeblock/${blockCard.id}`}>
                   <Button  variant="contained">{blockCard.title}</Button>
                    </Link>
                })
            
                }
            </Stack>           
        
            </div>   
            </div>
        </div>
     );
}
 
export default LobbyPage ;