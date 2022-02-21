import React, { useEffect, useState } from "react";
import axios from 'axios';


function BookingSite() {

  const [rooms, setRooms] = useState([]);
  useEffect(()=> {
		const url = '/getRooms';
		axios.get(url)
			.then(res =>{
				console.log(res);
				setRooms(res.data);
			})
			.catch(err => {
				console.log("FETCH FEHLERRR: "+err);
			});
	},[]);

  return(
    <>
    <div>BookingSite</div>
    <input type="date"/>
    <input type='time'/>
    <div style={{display:'flex', justifyContent:'space-around', alignItems: 'center' }}>
    {rooms.map(room => {
      console.log(room);
      return(
        <div style={{border:'solid', borderColor:'black', borderRadius:'5', margin:'10px', padding:'10px', display: 'flex', flexDirection:'column', alignItems:'center', cursor:'pointer' }}>
          <h3>{room.raumNummer}</h3>
          <h3>{room.platzAnzahl}</h3>
          <h3>{room.inhalt}</h3>
        </div>
      )
    })}
    </div>
    </>
  );
}

export default BookingSite;