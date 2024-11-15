import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../authContext"; // Assuming you have an auth context
import {
  MDBContainer,
  MDBCarousel,
  MDBCarouselItem,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

function CarDetailsPage() {
  const { carId } = useParams();
  const { currentUser } = useAuth(); // Get current logged-in user
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carDoc = await getDoc(doc(db, "cars", carId));
        if (carDoc.exists()) {
          setCar(carDoc.data());
        } else {
          console.error("No car found with the given ID.");
        }
      } catch (error) {
        console.error("Error fetching car details: ", error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "cars", carId));
      alert("Car deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting car: ", error);
      alert("Error deleting car. Please try again.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-car/${carId}`);
  };

  if (!car) {
    return <div>Loading car details...</div>;
  }

  return (
    <MDBContainer className="mt-4">
      <MDBRow
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <MDBCol md="6" className="d-flex justify-content-center">
          <MDBCarousel showIndicators>
            {car.images.map((image, index) => (
              <MDBCarouselItem itemId={index + 1} key={index}>
                <img
                  src={image}
                  className="d-block w-100"
                  style={{
                    maxHeight: "400px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  alt={`Car Image ${index + 1}`}
                />
              </MDBCarouselItem>
            ))}
          </MDBCarousel>
        </MDBCol>

        <MDBCol md="6" className="d-flex justify-content-center">
          <div>
            <h2 className="text-center">
              {car.make} {car.model} ({car.year})
            </h2>
            <MDBRow>
              <MDBCol>
                <h4>Details</h4>
                <p>
                  <strong>Mileage:</strong> {car.mileage} Km/L
                </p>
                <p>
                  <strong>Color:</strong> {car.color}
                </p>
                <p>
                  <strong>Category:</strong> {car.category}
                </p>
              </MDBCol>
              <MDBCol>
                <h4>Contact</h4>
                <p>
                  <strong>Uploaded By:</strong> {car.email}
                </p>
              </MDBCol>
            </MDBRow>
            <p>
              <strong>Description:</strong> {car.description}
            </p>
            {currentUser && currentUser.email === car.email && (
              <div className="mt-4">
                <MDBBtn color="primary" onClick={handleEdit}>
                  Edit Car
                </MDBBtn>

                <MDBBtn color="danger" onClick={handleDelete} className="ml-2">
                  Delete Car
                </MDBBtn>
              </div>
            )}
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default CarDetailsPage;
