import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../authContext"; // Assuming you have an auth context
import { validateForm } from "./validateForm"; // Import the validation function

function CarEditPage() {
  const { carId } = useParams(); // Get the car ID from URL params
  const { currentUser } = useAuth(); // Get current logged-in user
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 31 }, (_, i) => currentYear - i);

  const [carData, setCarData] = useState(null);
  const [images, setImages] = useState([]);
  const [carCategory, setCarCategory] = useState("");
  const [formData, setFormData] = useState({
    carMake: "",
    carModel: "",
    mileage: "",
    color: "",
    year: "",
    description: "", // Added description field
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carDoc = await getDoc(doc(db, "cars", carId));
        if (carDoc.exists()) {
          const data = carDoc.data();
          setCarData(data);
          setFormData({
            carMake: data.make,
            carModel: data.model,
            mileage: data.mileage,
            color: data.color,
            year: data.year,
            email: data.email,
            description: data.description || "", // Ensure description is set
          });
          setCarCategory(data.category);
          setImages(data.images || []);
        } else {
          console.error("No car found with the given ID.");
        }
      } catch (error) {
        console.error("Error fetching car data: ", error);
      }
    };

    fetchCarData();
  }, [carId]);

  if (currentUser?.email !== formData?.email) {
    navigate(-1);
  }

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files).slice(0, 10); // Limit to 10 files
    setImages(selectedFiles);
  };

  const handleCategoryChange = (event) => {
    setCarCategory(event.target.value);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData, images, carCategory);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const carRef = doc(db, "cars", carId);
        await updateDoc(carRef, {
          make: formData.carMake,
          model: formData.carModel,
          mileage: formData.mileage,
          color: formData.color,
          year: formData.year,
          category: carCategory,
          description: formData.description, // Save description to the database
          images: images, // Assume images are URLs or base64 encoded strings
        });
        alert("Car details updated successfully!");
        navigate(`/car/${carId}`); // Redirect to the car details page
      } catch (error) {
        console.error("Error updating car: ", error);
        alert("Error updating car. Please try again.");
      }
    }
  };

  if (!carData) {
    return <div>Loading car data...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Car Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="carMake" className="form-label">
              Car Make
            </label>
            <input
              type="text"
              className="form-control"
              id="carMake"
              value={formData.carMake}
              onChange={handleChange}
              placeholder="e.g., Toyota"
            />
            {errors.carMake && (
              <small className="text-danger">{errors.carMake}</small>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="carModel" className="form-label">
              Car Model
            </label>
            <input
              type="text"
              className="form-control"
              id="carModel"
              value={formData.carModel}
              onChange={handleChange}
              placeholder="e.g., Corolla"
            />
            {errors.carModel && (
              <small className="text-danger">{errors.carModel}</small>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <select
              className="form-select"
              id="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.year && (
              <small className="text-danger">{errors.year}</small>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="carCategory" className="form-label">
              Car Category
            </label>
            <select
              className="form-select"
              id="carCategory"
              value={carCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Choose...</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
              <option value="Van">Van</option>
              <option value="Wagon">Wagon</option>
            </select>
            {errors.carCategory && (
              <small className="text-danger">{errors.carCategory}</small>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="mileage" className="form-label">
              Mileage
            </label>
            <input
              type="text"
              className="form-control"
              id="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="e.g., 20000"
            />
            {errors.mileage && (
              <small className="text-danger">{errors.mileage}</small>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              className="form-control"
              id="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Red"
            />
            {errors.color && (
              <small className="text-danger">{errors.color}</small>
            )}
          </div>
        </div>

        {/* Description field */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Car Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Provide a brief description of the car"
          ></textarea>
          {errors.description && (
            <small className="text-danger">{errors.description}</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="carImages" className="form-label">
            Upload Car Images (up to 10)
          </label>
          <input
            type="file"
            className="form-control"
            id="carImages"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <small className="form-text text-muted">
            {images.length} / 10 images selected
          </small>
          {errors.images && (
            <small className="text-danger">{errors.images}</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default CarEditPage;
