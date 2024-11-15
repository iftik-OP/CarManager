import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { auth } from "../firebaseConfig";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

function Navbar(props = {}) {
  const navigate = useNavigate();
  const handleCarRegistration = () => {
    navigate("/registerCar");
  };

  const handleYourListings = () => {
    props.setYourListings(!props.yourListings);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <nav className="navbar navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => console.log("99cars clicked")}
        >
          99cars
        </span>
        <form
          className="d-flex input-group w-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            value={props?.searchString}
            onChange={(e) => props.setSearchString(e.target.value)}
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>

          <div className="dropdown">
            <MDBDropdown>
              <MDBDropdownToggle
                className="input-group-text border-0"
                id="search-addon"
              >
                <i className="fas fa-user" style={{ cursor: "pointer" }}></i>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="px-2 py-4">
                <MDBDropdownItem
                  onClick={handleYourListings}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {!props.yourListings ? "Your Listings" : "All Listings"}
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={handleCarRegistration}
                  style={{ cursor: "pointer" }}
                >
                  List Your Car
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem
                  onClick={handleSignOut}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
