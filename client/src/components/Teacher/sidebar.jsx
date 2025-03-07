import React, { useState } from "react";
import "../../assets/css/Sidebar.css";
import { BsPersonFill } from "react-icons/bs";
import { TbHexagonLetterHFilled } from "react-icons/tb";
import SubMenu from "../common/SubMenu";
import defaultImg from "../../assets/img/default.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { IoAddOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { GiTeacher } from "react-icons/gi";
import { IoMdCloudUpload } from "react-icons/io";
import { GoVideo } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";

function Sidebar({ setSidebarOpen, sidebarOpen, sidebarRef, closeSidebarForMobile }) {
  const { user, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [scrollbarVisibility, setScrollbarVisibility] =
    useState("scrollbarDisappear");

  const subMenus = [{
    title: "Lectures",
    icon: <GiTeacher />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: "Upload Lecture",
        path: "/uploadlecture",
        icon: <IoMdCloudUpload style={{ width: "20px", height: "20px" }} />,
      },
      {
        title: "Browse Lectures",
        path: "/selectvideo",
        icon: (
          <GoVideo
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
    ],
  }];

  const imageSrc = userData && userData.images && userData.images[0] && userData.images[0].data
  ? `data:image/png;base64,${userData.images[0].data}`
  : defaultImg;

  return (
    <>
      <div>
        <div className={"sidebar " + (sidebarOpen ? "open" : "")} ref={sidebarRef} style={sidebarOpen ? {left: "0"} : {}}>
          <div className="logo-details">
            <TbHexagonLetterHFilled
              color="white"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
              className={"" + (sidebarOpen ? "" : "w-0")}
            />
            <div className="logo_name" >{sidebarOpen ? "Hustlers" : ""}</div>
            <i
              className={"close-btn bx " + (sidebarOpen ? "bx-menu-alt-right" : "bx-menu")}
              id="btn"
              onClick={() => {
                setSidebarOpen((prev) => !prev);
              }}
            />
          </div>
          <ul
            className={"nav-list " + scrollbarVisibility}
            onMouseEnter={() => {
              setScrollbarVisibility("");
            }}
            onMouseLeave={() => {
              setScrollbarVisibility("scrollbarDisappear");
            }}
          >
            <li>
              <Link onClick={closeSidebarForMobile} to="/">
                <i className="bx bx-grid-alt" />
                <span className="links_name">Dashboard</span>
              </Link>
              <span className="tooltip">Dashboard</span>
            </li>
            <li>
              <Link onClick={closeSidebarForMobile} to="/studentattendance">
                <i className="bx d-flex justify-content-center align-items-center">
                  <IoInformationCircleOutline 
                    style={{ width: "20px", height: "20px" }}
                  />
                </i>
                <span className="links_name">Student Attendance</span>
              </Link>
              <span className="tooltip">Mark Attendance</span>
            </li>
            <li>
              <Link onClick={closeSidebarForMobile} to="/timetable">
                <i className="bx d-flex justify-content-center align-items-center">
                  <RiCalendarScheduleLine 
                    style={{ width: "20px", height: "20px" }}
                  />
                </i>
                <span className="links_name">Timetables</span>
              </Link>
              <span className="tooltip">Timetables</span>
            </li>
            {subMenus.map((subMenuData, index) => {
             return (
              <li className="customSubMenu">
                <SubMenu key={index} closeSidebarForMobile={closeSidebarForMobile} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} item={subMenuData} />
              </li>
             )
            })}
            <li className={"profile " + (sidebarOpen ? "leftZero" : "")}>
              <div className="profile-details">
              <img 
              style={{ borderRadius: '50%', objectFit: 'cover', height: '40px', width: '40px' }}
              src={imageSrc}
              alt="User Profile"
              />
                <div className="name_job">
                  <div className="name">{user ? user.Name : ""}</div>
                  <div className="job">{user ? user.Role : ""}</div>
                </div>
              </div>
              <i
                className="bx bx-log-out"
                id="log_out"
                onClick={() => {
                  dispatch(logout())
                  navigate("/login")
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
