import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";

import { MDBContainer } from "mdb-react-ui-kit";
import Navbar from "./navbar";
import CarCard from "./productCard";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../authContext";

function HomePage() {
  const [cars, setCars] = useState([]);
  // const [filteredCars, setFilteredCars] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [yourListings, setYourListings] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carData);
      } catch (error) {
        console.error("Error fetching cars: ", error);
      }
    };

    fetchCars();
  }, []);

  let filteredCar = cars.filter(
    (car) =>
      car?.make
        ?.toLocaleLowerCase()
        ?.includes(searchString.toLocaleLowerCase()) ||
      car?.color
        ?.toLocaleLowerCase()
        ?.includes(searchString.toLocaleLowerCase()) ||
      car?.model
        ?.toLocaleLowerCase()
        ?.includes(searchString.toLocaleLowerCase()) ||
      car?.year
        ?.toLocaleLowerCase()
        ?.includes(searchString.toLocaleLowerCase()) ||
      car?.description
        ?.toLocaleLowerCase()
        ?.includes(searchString.toLocaleLowerCase()) ||
      car?.category
        ?.toLocaleLowerCase()
        ?.includes(searchString.toLocaleLowerCase())
  );

  if (yourListings) {
    filteredCar = filteredCar.filter((car) => car.email === currentUser?.email);
  }

  return (
    <MDBContainer fluid>
      <Navbar
        searchString={searchString}
        setSearchString={setSearchString}
        yourListings={yourListings}
        setYourListings={setYourListings}
      />
      <MDBContainer className="mt-4">
        <h2>Welcome to 99Cars</h2>
        <p>Explore, manage, and search your car listings.</p>
        <h2>Available Cars</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {filteredCar.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </MDBContainer>
    </MDBContainer>
  );
}

export default HomePage;
