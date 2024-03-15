import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { MdPerson } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Tempelate({ children }){
  const [navigation, setNavigation] = useState(() => {
    return localStorage.getItem("sideNav") || "my-students";
  });

  const navigate = useNavigate();

  const handleNavigation = (nav) => {
    setNavigation(nav);
    localStorage.setItem("sideNav", nav);
    navigate(`/home/${nav}`);
  };

  useEffect(() => {
    handleNavigation(navigation);
  }, []);

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
          <div className="feed-block right">{children}</div>
        </header>
      </div>
      <Footer></Footer>
    </>
  );
}
