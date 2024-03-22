import React, { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import "./home.css";
import { FaUserFriends } from "react-icons/fa";

function Home() {
  const [navigation, setNavigation] = useState("my-students");

  // Function to handle navigation
  const handleNavigation = (nav) => {
    setNavigation(nav);
  };

  return (
    <>
      <Header></Header>
      <div className="main">
        <header>
        <div className="feed-block left">
            <nav>
              <ul>
                <li
                  className={navigation === "my-students" ? "active" : ""}
                  onClick={() => handleNavigation("my-students")}
                >
                  <FaUserFriends className="iconStyle" /> My Students
                </li>
                <li
                  className={navigation === "all-students" ? "active" : ""}
                  onClick={() => handleNavigation("all-students")}
                >
                  <FaUserFriends className="iconStyle" /> All students
                </li>
                <li
                  className={navigation === "view" ? "active" : ""}
                  onClick={() => handleNavigation("view")}
                >
                  <FaUserFriends className="iconStyle" /> View
                </li>
              </ul>
            </nav>
          </div>
          <div className="feed-block right">
          </div>
        </header>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
