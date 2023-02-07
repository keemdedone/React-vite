import { useState } from "react";
import { useParams } from "react-router-dom";
import { eldenRing_menu, gameList } from "../../../model/model";
import Button from "@mui/material/Button";
import "./game-view.scss";

const gameView = () => {
  const { id } = useParams();
  const numOfList = Number(id);
  const [APICall, setAPICall] = useState<string>("");
  const [APILimit, setAPILimit] = useState<number>(55);
  const [APIMax, setAPIMax] = useState<number>(0);
  const [APILoad, setAPILoad] = useState<boolean>(false);
  const [info, setInfo] = useState<any>([]);

  const getData = (callType: string) => {
    if (APICall && APICall === callType) {
      console.log("Call more data");
    } else {
      setAPILimit(55);
      setAPILoad(true);
    }
    setAPICall(callType);
    const base_url = gameList[Number(id)].api.base;
    fetch(`${base_url}/${callType}?limit=${APILimit}`)
      .then((res) => res.json())
      .then((res) => {
        setAPIMax(res.total);
        setInfo(res.data);
        setTimeout(() => {
          setAPILoad(false);
        }, 1000);
      });
  };

  // const getMoreData = () => {
  //   const newLimit = APILimit + 55;
  //   setAPILimit(newLimit);
  //   getData(APICall);
  // };

  return (
    <div className="game-view page-container">
      <div className="name">{gameList[numOfList].name}</div>
      <div className="menu-select">
        {eldenRing_menu.map((item, i) => (
          <Button
            key={i}
            onClick={() => getData(item.call)}
            variant="outlined"
            className="info-select"
          >
            {item.name}
          </Button>
        ))}
      </div>
      {!APILoad ? (
        <div
          className={
            info && info.length > 0 ? "display-data" : "display-data emtry"
          }
        >
          <ul>
            {info.map((data: any, index: number) => (
              <li key={index}>{data.name}</li>
            ))}
            {/* {APILimit >= APIMax ? (
              ""
            ) : (
              <li className="load-more">
                <Button variant="text" onClick={getMoreData}>
                  Load more..
                </Button>
              </li>
            )} */}
          </ul>
        </div>
      ) : (
        <div className="loading-data">
          <div className="animation">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default gameView;
