import React, { useState } from "react";
import { signupUser } from "../services/authServices";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = await signupUser(email, password);
    if (result.success) {
      alert("Signup successful!");
      // Redirect or clear form, depending on your app logic
    } else {
      setError(result.error);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <MDBRow className="w-100">
        <MDBCol
          sm="6"
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div className="d-flex flex-row ps-5 pt-5">
            <MDBIcon
              fas
              icon="car-side fa-3x me-3"
              style={{ color: "#709085" }}
            />
            <span className="h1 fw-bold mb-0">99Cars</span>
          </div>

          <div className="d-flex flex-column justify-content-center w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Sign Up
            </h3>

            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Email address"
              id="formEmail"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Password"
              id="formPassword"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Confirm Password"
              id="formConfirmPassword"
              type="password"
              size="lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <MDBBtn
              className="mb-4 px-5 mx-5 w-100"
              color="info"
              size="lg"
              onClick={handleSignup}
            >
              Sign Up
            </MDBBtn>
            <p className="ms-5">
              Already have an account?{" "}
              <a href="/" className="link-info">
                Login here
              </a>
            </p>
          </div>
        </MDBCol>
        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="https://wallpapers-max.b-cdn.net/wallpapers/13apr2023/hd/classic-bmw-aesthetic-cars-wallpaper.jpg"
            alt="Signup image"
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              objectPosition: "left",
              height: "100vh",
            }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupPage;
