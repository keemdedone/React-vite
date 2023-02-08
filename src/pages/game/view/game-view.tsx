import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eldenRing_menu, gameList } from "../../../model/model";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./game-view.scss";

const gameView = () => {
  const { id } = useParams();
  const numOfList = Number(id);
  const [APICall, setAPICall] = useState<string>("");
  const [APILimit, setAPILimit] = useState<number>(24);
  const [APIPage, setAPIPage] = useState<number>(0);
  const [APIMax, setAPIMax] = useState<number>(0);
  const [APILoad, setAPILoad] = useState<boolean>(false);
  const [info, setInfo] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const base_url = gameList[Number(id)].api.base;
      setAPILoad(true);
      try {
        const res = await fetch(
          `${base_url}/${APICall}?limit=${APILimit}&page=${APIPage}`
        );
        const json = await res.json();
        setAPIMax(json.total);
        setInfo(json.data);
      } catch (error) {
        console.error(error);
        alert("เกิดข้อผิดพลาดระหว่างดึงข้อมูล.");
      } finally {
        setTimeout(() => {
          setAPILoad(false);
        }, 500);
      }
    };
    if (APICall) {
      fetchData();
    }
  }, [APICall, APILimit, APIPage, id]);

  const handleGetData = (callType: string, pagination?: number) => {
    if (APICall === callType) {
      if (pagination && APIPage + pagination >= 0) {
        setAPIPage(APIPage + pagination);
      }
    } else {
      setAPIPage(0);
      setAPILimit(24);
    }
    setAPICall(callType);
  };

  return (
    <div className="game-view page-container">
      <div className="name">{gameList[numOfList].name}</div>
      <div className="menu-select">
        {eldenRing_menu.map((item, i) => (
          <Button
            key={i}
            onClick={() => handleGetData(item.call)}
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
              <li key={index}>
                <div className="image">
                  <img
                    src={data.image ? data.image : "/src/assets/no-image.png"}
                  />
                </div>
                <span>{data.name}</span>
                <div className="description">
                  <h4 className="des-title">{data.name}</h4>
                  <p className="des-text">
                    {data.description ? data.description : "No description."}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {APILimit >= APIMax ? (
            ""
          ) : (
            <div className="load-more">
              <IconButton
                color="primary"
                className="pagination-btn"
                onClick={() => handleGetData(APICall, -1)}
                disabled={APIPage === 0}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <code className="page-num">{APIPage + 1}</code>
              <IconButton
                color="primary"
                className="pagination-btn"
                onClick={() => handleGetData(APICall, 1)}
                disabled={APIPage === Math.floor(APIMax / APILimit)}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          )}
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
