import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar/navbar";
import Sidebar from "./component/sidebar/sidebar";
import WrapList from "./component/wrap-list/wrapList";
import Footer from "./component/footer/footer";

import Home from "./pages/home/home";
import Calendar from "./pages/calendar/calendar";
import Weather from "./pages/weather/weather";

import "./App.scss";

// rafce
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
          <WrapList />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
