import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./BtnSlider.css";
import pfeil from './pfeil.png';


function BtnSlider() {

  
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


  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = rooms.length -1;
    if(index < 0){
      setIndex(lastIndex);
    }
    else if(index > lastIndex){
      setIndex(0);
    }
  }, [index, rooms]);






  return (
    <section className="section">
      <div className="section-center">
      {rooms.map((room, indexRoom) => {
          
          const {raumNummer, platzAnzahl, inhalt} = room;
        
          let position = 'nextSlide';
          if(indexRoom === index){
            position = "activeSlide";
          }  
          if(indexRoom === index - 1 || (index === 0 && indexRoom === rooms.length - 1)){
            position = 'lastSlide'
          }
          return(
            <article className={position} key={raumNummer}>
              <h4>Raumnummer: {raumNummer}</h4>
              <h4>Plaetze: {platzAnzahl}</h4>
              <h4>Inhalt: {inhalt}</h4>
            </article>
            
          )
        
        })}
      </div>

      <div className="roomBtns">
        <img id='links' src={pfeil} onClick={() => setIndex(index + 1)}/>
        <img src={pfeil} onClick={() => setIndex(index - 1)}/>
      </div>
      
      
    </section>
  )
}

export default BtnSlider