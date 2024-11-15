import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { loginUser } from "../services/authServices";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(email, password);

    if (result.success) {
      // alert("Login successful!");
      navigate("/");
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
              Log in
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
            {error && <p style={{ color: "red" }}>{error}</p>}

            <MDBBtn
              className="mb-4 px-5 mx-5 w-100"
              color="info"
              size="lg"
              onClick={handleLogin}
            >
              Login
            </MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5">
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p className="ms-5">
              Don't have an account?{" "}
              <Link to="/signup" className="link-info">
                Register here
              </Link>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="https://img.freepik.com/premium-photo/blurred-car-repair-station-with-epoxy-floor-electric-lift-background-vertical-mobile-wallpaper_795881-34005.jpg"
            alt="Login image"
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

export default LoginPage;
