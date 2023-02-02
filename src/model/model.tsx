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

export const footerImages = [
  {
    src: "vite.png",
    name: "Vite",
  },
  {
    src: "react.svg",
    name: "React",
  },
  {
    src: "ts.png",
    name: "TS",
  },
  {
    src: "scss.png",
    name: "SCSS",
  },
  {
    src: "mui.svg",
    name: "MUI",
  },
];

export const dayName = [
  {
    full: "Monday",
    short: "Mon.",
  },
  {
    full: "Thuesday",
    short: "Tues.",
  },
  {
    full: "Wednesday",
    short: "Wed.",
  },
  {
    full: "Thursday",
    short: "Thurs.",
  },
  {
    full: "Friday",
    short: "Fri.",
  },
  {
    full: "Saturday",
    short: "Sat.",
  },
  {
    full: "Sunday",
    short: "Sun.",
  },
];

export const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
