import { Link, useLocation } from "react-router-dom";

import { gameList } from "../../model/model";

import "./game.scss";

const game = () => {
  const currentRoute = useLocation().pathname;

  return (
    <div className="page-container">
      <div>
        <h3 className="topic">Name list</h3>
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
