import { Link, useLocation } from "react-router-dom";

import { menuItems } from "../../model/model";

import "./sidebar.scss";

const Sidebar = () => {
  const currentRoute = useLocation().pathname;

  return (
    <div className="sidebar">
      <div className="side-head">
        <h1>Custom Site</h1>
      </div>
      <div className="side-body">
        <ul className="nav-link">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={currentRoute === item.path ? "link active" : "link"}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
