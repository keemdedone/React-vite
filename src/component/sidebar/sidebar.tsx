import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="side-head"></div>
      <div className="side-body">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
