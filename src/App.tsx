import { useState } from "react";
import { Button } from "@mui/material";
import reactLogo from "./assets/react.svg";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  function alertMsg(msg: string) {
    alert('This is alert say " ' + msg + ' "');
  }

  return <div className="App"></div>;
}

export default App;
