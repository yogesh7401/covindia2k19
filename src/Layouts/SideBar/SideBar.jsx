import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import India from "../../Assets/Image/india.svg";
import Table from "../../Assets/Image/table.svg";
import Home from "../../Assets/Image/home.svg";
import Calendar from "../../Assets/Image/calendar.svg";
import Desktop from "../../Assets/Image/desktop.svg";
import useWindowSize from "../../Components/Hooks";

export default function SideBar() {
  const [width, height] = useWindowSize();
  const [toggle, setToggle] = useState(window.innerWidth < 1024 ? false : true);
  const withBorder =
    "mx-auto cursor-pointer w-auto py-5 px-8 bg-primary bg-opacity-20 border-r-2 border-primary ";
  const withOutBorder = "mx-auto cursor-pointer w-auto py-5 px-8";
  const location = useLocation();
  function handleChange() {
    setToggle(!toggle);
  }
  useEffect(() => {
    if (width < 1024) {
      setToggle(false);
    }
  }, [width]);
  return (
    <div className="z-40 relative">
      <div className="container mx-auto ">
        <button
          className="lg:hidden absolute text-primary top-4 right-5 bg-white"
          onClick={() => setToggle(!toggle)}
        >
          <svg
            fill="#3d5a80"
            className=" "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30px"
            height="30px"
          >
            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
          </svg>
        </button>
      </div>
      <div className={toggle ? "block z-50" : "hidden lg:block"}>
        <div className="w-28 fixed shadow-lg top-0 bottom-0 border-secondary bg-light overflow-y-auto z-50">
          <Link to="/" onClick={() => handleChange(false)}>
            <img
              className={location.pathname === "/" ? withBorder : withOutBorder}
              src={Home}
              alt="Home"
            />
          </Link>
          <Link to="/state-table" onClick={() => handleChange(false)}>
            <img
              className={
                location.pathname === "/state-table"
                  ? withBorder
                  : withOutBorder
              }
              src={Table}
              alt="Table"
            />
          </Link>
          <Link to="/state-map" onClick={() => handleChange(false)}>
            <img
              className={
                location.pathname === "/state-map" ? withBorder : withOutBorder
              }
              src={India}
              alt="india"
            />
          </Link>
          <Link to="/graph/India" onClick={() => handleChange(false)}>
            <img
              className={
                location.pathname.startsWith("/graph")
                  ? withBorder
                  : withOutBorder
              }
              src={Calendar}
              alt="Calendar"
            />
          </Link>
          <Link to="/dashboard" onClick={() => handleChange(false)}>
            <img
              className={
                location.pathname.startsWith("/dashboard")
                  ? withBorder
                  : withOutBorder
              }
              src={Desktop}
              alt="Desktop"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
