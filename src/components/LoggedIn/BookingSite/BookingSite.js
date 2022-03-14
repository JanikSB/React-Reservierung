import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./BookingSite.css";
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import { format } from "date-fns";
import BookingCalendar from "./BookingCalendar/BookingCalendar";



function BookingSite({user}) {

  //Alle Reservierungen aus der DB auslesen und in state 'dbBookings' speichern
  const [dbBookings, setDbBookings] = useState([]);
  const readBookings = () => {
    const url = '/getBookings';
		axios.get(url)
			.then(res =>{
				console.log(res);
				setDbBookings(res.data);
			})
			.catch(err => {
				console.log("FETCH FEHLERRR: "+err);
			});
  }
  useEffect(()=>{
    readBookings();
  },[]);


//Alle Raeume aus der DB auslesen und in state 'dbBookings' speichern
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
	},[dbBookings]);


  //Reservierung in DB eintragen
  const bookingInDB = (bookerName, roomNumber, dateTimeFrom, dateTimeTo) => {
    (async () => {
      try {
          await fetch('/addBooking', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  bookerName: bookerName, raumNummer: roomNumber, dateTimeFrom: dateTimeFrom,
                  dateTimeTo: dateTimeTo
              })
          })
              .then(readBookings())
              // .then(alert(`Reservation of Room ${roomNumber} has been reserved successfully from ${dateTimeFrom} until ${dateTimeTo}.`))
      }
      catch (err) {
          console.log(err);
      }
   })()
  }
  




  //Ausgewahelten Raum im state 'selectedRoom' speichern
  const [selectedRoom, setSelectedRoom] = useState('');
  const selectRoom = (e) => {
    e.preventDefault();
    console.log(e);
    setSelectedRoom(e.currentTarget.id);
  }

  //Ausgewaehlte Startzeit aus DateTimePicker in state 'bookingStart' speichern
  const [bookingStart, setBookingStart] = useState();
  const handleStartTime = ({target}) => {
    setBookingStart(target.value);
  }

  //Ausgewaehlte Startzeit aus DateTimePicker in state 'bookingEnd' speichern
  const [bookingEnd, setBookingEnd] = useState();
  const handleEndTime = ({target}) => {
    setBookingEnd(target.value);
  }



  


//String des Datums aus DB zuschneiden damit richtig funktioniert (sonst ist die Buchungsuhrzeit um eine Stunde verschoben (???))
  const cutDownStringDate = (stringDate) => {
    var newString = stringDate.substring(0, stringDate.length -1);

    return newString
  }

  

  //Buchungsinfos pruefen und in Datenbank eintragen
  const book = () => {

    let start = bookingStart.getTime();
    let end = bookingEnd.getTime();
    let room = selectedRoom;

    let checkFree = true;

    console.log('START DATE: '+bookingStart);

    dbBookings.map( booking => {

      console.log('DB START: '+ new Date(cutDownStringDate(booking.dateTimeFrom)) + ' ' + booking.raumNummer);
      

      let dbStart = new Date(cutDownStringDate(booking.dateTimeFrom)).getTime();
      let dbEnd = new Date(cutDownStringDate(booking.dateTimeTo)).getTime();
      let dbRoom = booking.raumNummer;


      // compare(start, end, dbStart, dbEnd, room, dbRoom, checkFree); Am besten folgende if funktion auslagern
      if(
        room == dbRoom && (
          start == dbStart ||
          end == dbEnd ||
          ((start > dbStart) && (start < dbEnd)) ||
          ((end > dbStart) && (end < dbEnd))
        )
      ){ 
        console.log('check ob raum frei ist auf false (nein) gesetzt');
        checkFree = false
      }

      return checkFree;
      
    })

    if(checkFree){ 
      console.log(`Reservierung erfolreich Start: ${bookingStart}, Ende: ${end}, Raum: ${room} `);
      bookingInDB(`${user.name}`, `${room}`, format(bookingStart, 'yyyy-MM-dd kk:mm'), format(bookingEnd, 'yyyy-MM-dd kk:mm'));
      alert('KLAPPT? ' + format(bookingStart, 'yyyy-MM-dd kk:mm') +' '+format(bookingEnd, 'yyyy-MM-dd kk:mm'));
    }else alert("Reservierung fehlgeschlagen");
    
  }






  //RENDER DER BUCHUNGSSEITE
  return(
    <>
    <div className="bookingContainer">

      {/* Linke Seite */}
      <div className="bookingLeftSite">
        <h1>Raumbuchung</h1>
        <h3>in Kassel</h3>

        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems: 'center' }}>
        {rooms.map(room => {
          return(
            <button className='roomBtn' key={room.raumNummer} id={room.raumNummer} onClick={selectRoom} 
            style={{border:'solid', borderColor:'black ', backgroundColor: 'blue',borderRadius:'5', margin:'10px', padding:'10px', display: 'flex', flexDirection:'column', alignItems:'center', cursor:'pointer' }}>

              <h3>Raumnummer: {room.raumNummer}</h3>
              <h3>Plaetze: {room.platzAnzahl}</h3>
              <h3>Inhalt: {room.inhalt}</h3>
            </button>
          )
        })}
        </div>

        
        {/* Zeitauswahl fuer Buchung */}
        <div className="bookingDatePicker" style={{color: "white"}}>
        <DateTimePickerComponent 
        placeholder="Ab wann willst du diesen Raum buchen?"
        min={new Date()}
        strictMode={true}
        
        onChange={handleStartTime}
        value={bookingStart}

        format='dd.MM.yy HH:mm'
        step={60}
        />

        <DateTimePickerComponent 
        placeholder="Bis wann willst du diesen Raum buchen?"
        min={bookingStart}
        strictMode={true}

        onChange={handleEndTime}
        value={bookingEnd}

        format='dd.MM.yy HH:mm'
        step={60}
        />
        </div>


      </div>

      {/* Rechte Seite (Kalender mit Buchungen) */}
      <div className='bookingContent' style={{padding: '50px'}}>


        {/* <div>BookingSite</div>
        <div>Hello {user.name}</div> */}

        {/* Zeitauswahl fuer Buchung */}
        {/* <div className="bookingDatePicker" style={{color: "white"}}>
        <DateTimePickerComponent 
        placeholder="Ab wann willst du diesen Raum buchen?"
        min={new Date()}
        strictMode={true}
        
        onChange={handleStartTime}
        value={bookingStart}

        format='dd.MM.yy HH:mm'
        step={60}
        />

        <DateTimePickerComponent 
        placeholder="Bis wann willst du diesen Raum buchen?"
        min={bookingStart}
        strictMode={true}

        onChange={handleEndTime}
        value={bookingEnd}

        format='dd.MM.yy HH:mm'
        step={60}
        />
        </div> */}


        {/* Raumauswahl fuer Buchung */}
        {/* <div style={{display:'flex', justifyContent:'space-around', alignItems: 'center' }}>
        {rooms.map(room => {
          return(
            <button className='roomBtn' key={room.raumNummer} id={room.raumNummer} onClick={selectRoom} 
            style={{border:'solid', borderColor:'black ', backgroundColor: 'blue',borderRadius:'5', margin:'10px', padding:'10px', display: 'flex', flexDirection:'column', alignItems:'center', cursor:'pointer' }}>

              <h3>Raumnummer: {room.raumNummer}</h3>
              <h3>Plaetze: {room.platzAnzahl}</h3>
              <h3>Inhalt: {room.inhalt}</h3>
            </button>
          )
        })}
        </div> */}


        <div className="bookingCalendar">
          <BookingCalendar />
        </div>



        {/* Knopf zum Reservieren des Raumes zur ausgewaehlten Uhrzeit */}
        <button type="submit" onClick={book}>Reservieren</button>
      </div>
    </div>
    </>
  );
}

export default BookingSite;