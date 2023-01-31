import HomeIcon from "@mui/icons-material/HouseRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthRounded";
import AcUnitIcon from "@mui/icons-material/AcUnitRounded";

export const menuItems = [
  {
    path: "/",
    name: "Home",
    icon: <HomeIcon className="icon" />,
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: <CalendarMonthIcon className="icon" />,
  },
  {
    path: "/weather",
    name: "Weather",
    icon: <AcUnitIcon className="icon" />,
  },
];
