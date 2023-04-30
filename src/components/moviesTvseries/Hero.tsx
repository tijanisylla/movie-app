import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Movies.css";
import Filter from "../filter/Filter";
import YouTube from "react-youtube";
import ContextAll from "../context/ContextAll";
import { auth } from "../auth/authMethods";
import { useAuthState } from "react-firebase-hooks/auth";
import Carousel from "../carousel/Carousel";

interface HeroStyle {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
  backgroundRepeat: string;
  backgroundAttachment: string;
}

const Hero = () => {
  const [getTrailer, setGetTrailer] = useState<any>(null);
  const [trailerModal, setTrailerModal] = useState<boolean>(false);
  const { selectedMovie, setOpenLogin, addToMyList } = useContext(ContextAll);
  const [user] = useAuthState(auth) as null | any;

  useEffect(() => {
    const fetchTrailer = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${
          selectedMovie?.title ? "movie" : "tv"
        }/${selectedMovie?.id}/videos`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "en-US",
          },
        }
      );
      setGetTrailer(
        data
          ? data.results.filter((item: any) => item.type === "Trailer")
          : null
      );
    };
    fetchTrailer();
  }, [selectedMovie]);

  const style: HeroStyle = {
    backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  useEffect(() => {
    // press esc to close trailer
    const escFunction = (event: any) => {
      if (event.keyCode === 27) {
        setTrailerModal(false);
      }
    };
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  useEffect(() => {
    // press ENTER to open trailer
    const enterFunction = (event: any) => {
      if (event.keyCode === 13) {
        setTrailerModal(true);
      }
    };

    document.addEventListener("keydown", enterFunction, false);
    return () => {
      document.removeEventListener("keydown", enterFunction, false);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setOpenLogin(false);
    }
  }, [user, setOpenLogin]);

  // must be logged befor play trailer
  const playTrailer = () => {
    if (user) {
      setTrailerModal(true);
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <>
      {selectedMovie === null ? (
        <Carousel />
      ) : (
        <div className={"moovies__hero"} style={style}>
          {/* close trailer */}
          {trailerModal && (
            <button
              className="button--close"
              onClick={() => setTrailerModal(false)}
            >
              <i className="uil uil-times button__icon"></i>
            </button>
          )}

          {trailerModal && (
            <YouTube
              videoId={
                getTrailer?.length > 0
                  ? getTrailer[0].key
                  : // not found trailer
                    "2U76x2fD_tE"
              }
              className="Youtube-container"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                },
              }}
            />
          )}

          {/* If video is available */}
          {/* hero info */}

          <div className="moovies__hero-info">
            <h1 className="moovies__hero-title">
              {selectedMovie?.title ||
                selectedMovie?.name ||
                selectedMovie?.original_name}
            </h1>

            <div className="moovies__hero-description">
              <span className="moovies__hero-hd">HD</span>
              <span className="moovies__hero-tag">
                <i className="uil uil-clock"></i>
                {/* time */}
                {selectedMovie?.runtime > 60
                  ? // if time is more than 60 min
                    `${Math.floor(selectedMovie?.runtime / 60)}h ${
                      selectedMovie?.runtime % 60
                    }min`
                  : // convert to hours and minutes
                    `${
                      selectedMovie?.episode_run_time[0] > 60
                        ? `${Math.floor(
                            selectedMovie?.episode_run_time[0] / 60
                          )}h ${selectedMovie?.episode_run_time[0] % 60}min`
                        : `${selectedMovie?.episode_run_time[0]
                            .toString()
                            .slice(0, 1)
                            .replace(
                              "0",
                              ""
                            )}h ${selectedMovie?.episode_run_time[0]
                            .toString()
                            .slice(1)}min`
                    }`}
              </span>
              <span className="moovies__hero-tag">
                {selectedMovie?.status === "Ended" ? "Ended" : "Ongoing"}
              </span>
              <span className="moovies__hero-tag">
                {
                  selectedMovie?.release_date
                    ? selectedMovie?.release_date.slice(0, 4) // movie
                    : selectedMovie?.first_air_date.slice(0, 4) // series
                }
              </span>
              <div className="circle-progress moovies__hero-tag">
                <svg className="circle-progress__svg" viewBox="0 0 100 100">
                  <circle
                    className="circle-progress__circle"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#2d3436"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="0"
                  />
                  <circle
                    className="circle-progress__circle"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="var(--main-color)"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - selectedMovie?.vote_average * 28.3}
                  />
                </svg>

                <div className="circle-progress__info ">
                  <span className="circle-progress__text">
                    {selectedMovie?.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <p>
              {selectedMovie?.overview
                ? selectedMovie?.overview
                : "No description available"}
            </p>

            {/* genre */}
            <div className="moovies__hero-genre-list">
              {selectedMovie?.genres.map((genre: any) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            {/* buttons */}
            <div className="moovies__hero-buttons">
              <button
                className="btn-hero button--hero-1"
                onClick={() => {
                  playTrailer();
                }}
                // open trailer
              >
                Play <i className="uil uil-play button__icon"></i>
              </button>

              {/* add to my list button */}
              <button
                className="btn-hero button--hero-2"
                onClick={() => {
                  addToMyList(selectedMovie);
                  if (!user) {
                    setOpenLogin(true);
                  }
                }}
              >
                My List<i className="uil uil-heart button__icon"></i>
              </button>
            </div>
          </div>

          {/* carousel */}
          {/* Type tag */}
          <div className="moovies__hero-type-tag-container">
            {selectedMovie?.title ? <span>Movie</span> : <span>TV-MA </span>}
          </div>
        </div>
      )}
      {/* Filter */}
      <Filter />
    </>
  );
};
export default Hero;
