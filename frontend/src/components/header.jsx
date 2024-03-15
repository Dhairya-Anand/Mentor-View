import React from "react";
import logo from "../assets/images/logo.png";

function Header() {
  const logout = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.setItem("sideNav","my-students");
    window.location.href = "/";
  };

  return (
    <div className="header_main">
      <div className="header">
        <nav className="nav_header">
          <div className="left_nav">
            <img src={logo} alt="logo"></img>
            <h3>Mentor View</h3>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default Header;
