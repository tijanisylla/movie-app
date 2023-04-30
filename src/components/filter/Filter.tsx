import { FC, useContext, useEffect, useState } from "react";
import "./Filter.css";
import ContextAll from "../context/ContextAll";
import Pagination from "../pagination/Pagination";
import axios from "axios";
const Filter: FC = () => {
  const [genreList, setGenreList] = useState<any>(null);
  const [typeMovies, setTypeMovies] = useState<string>("movie");

  const { currentFilter, setCurrentFilter, setWithGenre } =
    useContext(ContextAll);

  // Get genre list
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/${typeMovies}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setGenreList(res.data.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [typeMovies]);

  // Set type movies or tv shows
  useEffect(() => {
    if (currentFilter === "Movies") {
      setTypeMovies("movie");
    } else if (currentFilter === "TV Shows") {
      setTypeMovies("tv");
    } else {
      setTypeMovies("movie");
    }
  }, [currentFilter]);

  // Set genre
  const hendleGenresMoviesAndTvShows = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWithGenre(e.target.value);
  };

  return (
    <section className="filter container" id="filter">
      <div className="filter__content">
        <div className="filter__content__title">
          <h3 className="filter__title">Recommended for you</h3>
        </div>

        <div className="filter__content__buttons">
          {/* text with filter icon */}
          <span className="text-filter">
            <i className="uil uil-filter"></i>
            Filter by
          </span>

          <button
            onClick={() => setCurrentFilter("Movies")}
            className={`btn-filter ${
              currentFilter === "Movies" && "active-filter"
            }`}
          >
            <i className="uil uil-film"></i>
            Movies
          </button>
          <button
            onClick={() => setCurrentFilter("TV Shows")}
            className={`btn-filter ${
              currentFilter === "TV Shows" && "active-filter"
            }`}
          >
            <i className="uil uil-tv-retro"></i>
            TV Shows
          </button>

          {/* Genre list */}
          <div className="filter__content__buttons__genre ">
            <select
              name="genre"
              id="genre"
              className="filter__genre"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                hendleGenresMoviesAndTvShows(e);
              }}
            >
              {genreList &&
                genreList.map((genre: any) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
        {/* <hr className="filter__line" /> */}
      </div>
    </section>
  );
};

export default Filter;
