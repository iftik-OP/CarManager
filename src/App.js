import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import HomePage from "./components/homepage";
import CarRegistrationForm from "./components/carRegistrationForm";
import ProtectedRoute from "./protectedRoute";
import CarDetailsPage from "./components/carDetailsPage";
import CarEditPage from "./components/carEditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/registerCar"
          element={
            <ProtectedRoute>
              <CarRegistrationForm />
            </ProtectedRoute>
          }
        />
        <Route path="/car/:carId" element={<CarDetailsPage />} />
        <Route path="/edit-car/:carId" element={<CarEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
