// Loading component

import { FC } from "react";
import "./Loading.css";

const Loading: FC = () => {
  return (
    <div className="loading">
      <div className="loading__container__text">
        <p>Loading...</p>
      </div>
      <div className="loading__container">
        <div className="loading__container__box">
          <div className="loading__container__box__circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
