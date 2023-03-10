import { Link, useLocation } from "react-router-dom";

import { gameList } from "../../model/model";

import "./game.scss";

const game = () => {
  const currentRoute = useLocation().pathname;

  return (
    <div className="page-container">
      <div>
        <h1 className="topic">Game List</h1>
        <ul className="list">
          {gameList.map((game, index) => (
            <li key={index}>
              <Link to={currentRoute + `/${index}`} className="link">
                {game.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default game;
