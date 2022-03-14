--Alle Tabellen erstellen:
CREATE TABLE Users (
userId int IDENTITY(1, 1) PRIMARY KEY,
userName varchar(50) UNIQUE,
email varchar(50) UNIQUE,
passwort varchar(50) NOT NULL
);

CREATE TABLE Rooms (
raumNummer varchar(50) PRIMARY KEY,
platzAnzahl int NOT NULL,
inhalt varchar(50)
);

CREATE TABLE Bookings (
bookingId int IDENTITY(1,1) PRIMARY KEY,
bookerName varchar(50) NOT NULL FOREIGN KEY REFERENCES Users(userName),
raumNummer varchar(50) NOT NULL FOREIGN KEY REFERENCES Rooms(raumNummer),
dateTimeFrom smalldatetime NOT NULL,
dateTimeTo smalldatetime NOT NULL,
);

CREATE TABLE BookingHistory (
bookerName varchar(50) NOT NULL FOREIGN KEY REFERENCES Users(userName),
raumNummer varchar(50) NOT NULL FOREIGN KEY REFERENCES Rooms(raumNummer),
dateTimeFrom smalldatetime NOT NULL,
dateTimeTo smalldatetime NOT NULL,
);



INSERT INTO Rooms VALUES
(1, 5, 'Beamer und Whiteboard'), (2, 4, 'Beamer'),(3, 2, 'Whiteboard');