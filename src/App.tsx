import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar/navbar";
import Sidebar from "./component/sidebar/sidebar";
import WrapList from "./component/wrap-list/wrapList";
import Footer from "./component/footer/footer";

import Home from "./pages/home/home";
import Calendar from "./pages/calendar/calendar";
import Weather from "./pages/weather/weather";
import Game from "./pages/game/game";
import GameView from "./pages/game/view/game-view";
import PageNotFound from "./pages/error/pageNotFound/pageNotFound";

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
            <Route path="/game" element={<Game />} />
            <Route path="/game/:id" element={<GameView />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <WrapList />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
