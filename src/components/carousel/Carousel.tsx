import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ContextAll from "../context/ContextAll";
import { auth } from "../auth/authMethods";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Carousel.css";

const API_URL = "https://api.themoviedb.org/3" as string;

const Carousel = () => {
  const [getTrailer, setGetTrailer] = useState<any>(null);
  const [trailerModal, setTrailerModal] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [carousel, setCarousel] = useState<number>(0);
  const [nextSlide, setNextSlide] = useState<number>(0);
  const [prevSlide, setPrevSlide] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);
  const [infoId, setInfoId] = useState<any>(null);

  const { setOpenLogin, addToMyList } = useContext(ContextAll);

  const [user] = useAuthState(auth) as null | any;

  useEffect(() => {
    // Fetch Movies and Tv at the same time with callback
    const fetchMovies = async () => {
      const { data } = await axios.get(`${API_URL}/discover/movie/`, {
        params: {
          api_key: "3da275bf12ccf72038f506c6228b9293",
          language: "en-US",
          page: 1,
        },
      });
      //10 movies from the array
      setResults(data.results.slice(0, 10));
    };
    fetchMovies();
  }, []);
  const fetchTrailer = async (item: any) => {
    const { data } = await axios.get(`${API_URL}/movie/${item?.id}/videos`, {
      params: {
        api_key: "3da275bf12ccf72038f506c6228b9293",
        language: "en-US",
        page: 1,
      },
    });

    setGetTrailer(
      data ? data.results.filter((item: any) => item.type === "Trailer") : null
    );
  };
  useEffect(() => {
    if (results) {
      fetchTrailer(results[carousel]);
    }
  }, [carousel, results, trailerModal, pause]);

  // Fetch Movie or Tv by id
  const fetchMovieOrTvById = async (
    id: number,
    type: string
  ): Promise<void> => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}`,
      {
        params: {
          api_key: "3da275bf12ccf72038f506c6228b9293",
          language: "en-US",
        },
      }
    );
    setInfoId(data);
  };

  useEffect(() => {
    if (results) {
      fetchMovieOrTvById(results[carousel].id, "movie");
    }
  }, [carousel, results]);

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
  const playTrailer = (id: number) => {
    if (user) {
      //  Link to youtube
      window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");
    } else {
      setOpenLogin(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setCarousel((prev) => prev + 1);
        if (carousel === results.length - 1) {
          setCarousel(0);
        }
        setNextSlide(carousel + 1);
        if (nextSlide === results.length - 1) {
          setNextSlide(0);
        }
        setPrevSlide(carousel - 1);
        if (prevSlide === 0) {
          setPrevSlide(results.length - 1);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [carousel, results, nextSlide, prevSlide, pause]);

  return (
    <div className="carousel__conatainer">
      {/*  */}
      {results &&
        results?.map((item: any, index: number) => (
          <div
            className={
              index === carousel
                ? "carousel__item active-carousel"
                : "carousel__item"
            }
            key={index}
            style={{
              backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${item?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              transform: `translateX(${index - carousel}00%)`,
              transition: "transform 1s ease-in-out",
            }}
          >
            {/* close trailer */}
            {trailerModal && (
              <button
                className="button--close"
                onClick={() => setTrailerModal(false)}
              >
                <i className="uil uil-times button__icon"></i>
              </button>
            )}

            {/* carousel info */}
            <div className="moovies__carousel-info">
              <h1 className="moovies__carousel-title">
                {item?.title || item?.name}
              </h1>
              <div className="moovies__carousel-description">
                <span className="moovies__carousel-hd">HD</span>
                <span className="moovies__carousel-tag">
                  <i className="uil uil-clock"></i>
                  {/* time */}
                  {
                    infoId?.runtime > 60 // if time is more than 60 min
                      ? `${Math.floor(infoId?.runtime / 60)}h ${
                          infoId?.runtime % 60
                        }min`
                      : // convert to hours and minutes
                        `${infoId?.runtime}min` // else just minutes
                  }
                </span>
                <span className="moovies__carousel-tag">
                  {infoId?.status === "Ended" ? "Ended" : "Ongoing"}
                </span>
                <span className="moovies__carousel-tag">
                  {
                    // date
                    infoId?.release_date?.slice(0, 4) || item?.first_air_date
                  }
                </span>
                <div className="circle-progress moovies__carousel-tag">
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
                      strokeDashoffset={283 - item?.vote_average * 28.3}
                    />
                  </svg>

                  <div className="circle-progress__info ">
                    <span className="circle-progress__text">
                      {infoId?.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <p>
                {infoId?.overview ? item?.overview : "No description available"}
              </p>

              {/* genre */}
              <div className="moovies__carousel-genre-list">
                {infoId?.genres?.map((item: any, index: number) => (
                  <span className="moovies__carousel-genre" key={index}>
                    {item?.name}
                  </span>
                ))}
              </div>
              {/* buttons */}
              <div className="moovies__carousel-buttons">
                <button
                  className="btn-carousel button--carousel-1"
                  onMouseEnter={() => setPause(true)}
                  onMouseLeave={() => setPause(false)}
                  onClick={() => {
                    playTrailer(
                      getTrailer?.length > 0 // if trailer is available
                        ? getTrailer[0]?.key
                        : "dQw4w9WgXcQ" // Rick Astley
                    );
                  }}
                >
                  Play <i className="uil uil-play button__icon"></i>
                </button>

                <button
                  className="btn-carousel button--carousel-2"
                  onClick={() => {
                    addToMyList(infoId || item);
                    if (!user) {
                      setOpenLogin(true);
                    }
                  }}
                  onMouseEnter={() => setPause(true)}
                  onMouseLeave={() => setPause(false)}
                >
                  My List <i className="uil uil-heart button__icon"></i>
                </button>
              </div>
            </div>
            {/* Type tag */}
            <div className="moovies__carousel-type-tag-container">
              {item?.title ? <span>Movie</span> : <span>TV-MA </span>}
            </div>
          </div>
        ))}
      {/* carousel buttons */}
      <div className="moovies__carousel-dots-container">
        {results &&
          results?.map((item: any, index: number) => (
            <button
              key={index}
              className={`moovies__carousel-dot ${
                index === carousel ? "moovies__carousel-dot-active " : ""
              }`}
              onClick={() => setCarousel(index)}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
