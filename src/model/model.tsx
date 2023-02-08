import HomeIcon from "@mui/icons-material/HouseRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthRounded";
import AcUnitIcon from "@mui/icons-material/AcUnitRounded";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

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
  {
    path: "/game",
    name: "Game",
    icon: <SportsEsportsIcon className="icon" />,
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

export const keys = {
  API_KEY: "d9e3f33539b4582e668b5097b2428c17",
  BASE_URL: "https://api.openweathermap.org/data/2.5/",
};

export const gameList = [
  {
    id: 1,
    name: "Elden Ring",
    poster: "",
    api: {
      credit: "eldenring.fanapis.com",
      base: "https://eldenring.fanapis.com/api",
    },
  },
];

/*-- Elden Ring --*/
export const eldenRing_menu = [
  {
    name: "Npc",
    call: "npcs",
    active: false,
  },
  {
    name: "Boss",
    call: "bosses",
    active: false,
  },
  {
    name: "Spirit",
    call: "spirits",
    active: false,
  },
  {
    name: "Weapon",
    call: "weapons",
    active: false,
  },
  {
    name: "Armor",
    call: "armors",
    active: false,
  },
  {
    name: "Ashe of War",
    call: "ashes",
    active: false,
  },
  {
    name: "Item",
    call: "items",
    active: false,
  },
  {
    name: "Location",
    call: "locations",
    active: false,
  },
];
/*-- Elden Ring --*/

export type WeatherAPI = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
