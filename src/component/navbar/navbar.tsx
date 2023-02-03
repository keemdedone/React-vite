import { useState, useEffect } from "react";

import ScheduleIcon from "@mui/icons-material/Schedule";
import CancelIcon from "@mui/icons-material/Cancel";
// import Tooltip from "@mui/material/Tooltip";
// import zoom from "@mui/material/Zoom";

import "./navbar.scss";

function Navbar() {
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const updateTime = () => {
    setTime(new Date());
  };

  const displayTime = () => {
    setShowTime(!showTime);
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="navbar">
      <div className="clock" onClick={displayTime}>
        <div className="icon">
          {!showTime ? <ScheduleIcon fontSize="large" /> : <CancelIcon />}
        </div>
        <div className={showTime ? "time show" : "time"}>
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
