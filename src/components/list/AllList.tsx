import { FC, useContext } from "react";
import ContextAll from "../context/ContextAll";
import "./Mylist.css";

const AllList: FC = () => {
  const { mylist, openList, setOpenList, setMylist, setSelectedMovie } =
    useContext(ContextAll);

  const handleOpenList = () => {
    setOpenList(false);
  };

  // Remove item from mylist
  const handleRemoveItem = (id: number) => {
    const newList = mylist.filter((item: any) => item.id !== id);
    setMylist(newList);
  };

  return (
    <>
      {openList && (
        <div className="mylist">
          <div className="mylist__container-overlay ">
            <div className="mylist__header">
              <h2>My List</h2>
              <img
                src={require("../assets/sylla-movies-high-resolution-logo-color-on-transparent-background.png")}
                alt="logo"
                width={200}
                height={200}
              />
              <button onClick={handleOpenList}>
                <i className="uil uil-times"></i>
              </button>
            </div>
            <div className="mylist__content">
              {mylist?.map((item: any, idx: number) => {
                const { title, poster_path, release_date, vote_average, id } =
                  item;
                return (
                  <div className="moovie__list-card" key={idx}>
                    <div
                      className="moovie__card-info-list-overlay"
                      onClick={() => {
                        setSelectedMovie(
                          mylist.find((item: any) => item.id === id)
                        );
                        window.scrollTo(0, 0);
                        setOpenList(false);
                      }}
                    >
                      <div className="moovie__card-list-info">
                        {/* Icon play  */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="var(--title-color-dark)"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="feather feather-play"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                    <div className="moovie__card-footer">
                      <div className="moovie__card-footer-info">
                        <svg
                          xmlns="http://www.w3.org/2000/
                             svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          className="feather-calendar"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span className="moovie__card-footer-info-date">
                          {release_date ? release_date.slice(0, 4) : "No date"}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          className="feather-star"
                        >
                          <polygon points="12 2 15.25 9.25 22.6 9.25 17.4 14.4 19.75 21.75 12 17.25 4.25 21.75 6.6 14.4 1.4 9.25 8.75 9.25 12 2"></polygon>
                        </svg>
                        <span className="moovie__card-footer-info-rating">
                          {vote_average ? vote_average.toFixed(1) : "NaN"}
                        </span>

                        <span
                          className="moovie__card-footer-info-rm"
                          onClick={() => handleRemoveItem(id)}
                        >
                          <i className="uil uil-trash-alt"></i>
                        </span>
                      </div>
                    </div>
                    {/* HD tag */}
                    <span className="moovie__card-list-hd">HD</span>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      alt={title}
                      className="moovie__card-list-img"
                    />
                  </div>
                );
              })}
              {
                // If mylist is empty
                mylist.length === 0 && (
                  <div className="mylist__empty">
                    <h2>My List is empty</h2>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllList;
