import React, { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header"; // Corrected import
import "./home.css";

import { MdPerson } from "react-icons/md";
import { IoCalendar } from "react-icons/io5"; // Corrected import
import { FaUserFriends } from "react-icons/fa";
// import Profile from "../profile/profile";
// import Friends from "../friends/friends";

function Home() {
  const [navigation, setNavigation] = useState("profile");

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
                  className={navigation === "friends" ? "active" : ""}
                  onClick={() => handleNavigation("friends")}
                >
                  <FaUserFriends className="iconStyle" /> Friends
                </li>
                <li
                  className={navigation === "profile" ? "active" : ""}
                  onClick={() => handleNavigation("profile")}
                >
                  <MdPerson className="iconStyle" /> Profile
                </li>
                <li
                  className={navigation === "events" ? "active" : ""}
                  onClick={() => handleNavigation("events")}
                >
                  <IoCalendar className="iconStyle" /> Events
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
