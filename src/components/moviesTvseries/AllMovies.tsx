import { FC, useState, useEffect, useContext } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Hero from "./Hero";
import TVSeries from "./TvSeries";
import ContextAll from "../context/ContextAll";

const AllMovies: FC = () => {
  // States
  const [movieData, setMovieData] = useState<any>(null);
  const [tvSerieData, setTvSerieData] = useState<any>(null);
  // Context
  const { currentFilter, currentPage, withGenre, setSelectedMovie } =
    useContext(ContextAll);
  const API_URL = "https://api.themoviedb.org/3" as string;

  useEffect(() => {
    // Fetch Movies and Tv at the same time with callback
    const fetchMoviesAndTv = async (callback: Function): Promise<void> => {
      const { data: movieData } = await axios.get(`${API_URL}/discover/movie`, {
        params: {
          api_key: "3da275bf12ccf72038f506c6228b9293",
          language: "en-US",

          page: currentPage,
          with_genres: withGenre,
        },
      });

      const { data: tvSerieData } = await axios.get(`${API_URL}/discover/tv`, {
        params: {
          api_key: "3da275bf12ccf72038f506c6228b9293",
          language: "en-US",
          page: currentPage,
          with_genres: withGenre,
        },
      });
      callback(movieData, tvSerieData);
    };
    fetchMoviesAndTv((movie: any, tvSerie: any) => {
      setMovieData(movie.results);
      setTvSerieData(tvSerie.results);
    });
  }, [currentPage, withGenre, currentFilter]);

  // Fetch Movie or Tv by id
  const fetchMovieOrTvById = async (
    id: number,
    type: string
  ): Promise<void> => {
    try {
      const { data } = await axios.get(`${API_URL}/${type}/${id}`, {
        params: {
          api_key: "3da275bf12ccf72038f506c6228b9293",
          language: "en-US",
        },
      });
      setSelectedMovie(data);
    } catch (err: any) {
      if (err) {
        alert("Something went wrong");
        throw new Error(err);
      }
    }
  };

  // Select movie by id
  const selectMovieById = async (mov: any): Promise<any> => {
    try {
      if (currentFilter === "TV Shows") {
        fetchMovieOrTvById(mov.id, "tv");
      } else {
        fetchMovieOrTvById(mov.id, "movie");
      }
    } catch (err: any) {
      if (err) {
        throw new Error(err);
      }
    }
  };

  const Movie = () => {
    return (
      <div className="moovies__container container" id="moovies__container">
        {/* Moovies  */}
        {movieData !== null &&
          movieData.map((movie: any) => {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                selectMovieById={selectMovieById}
              />
            );
          })}
      </div>
    );
  };

  const renderComponents = () => {
    if (currentFilter === "TV Shows") {
      return (
        <TVSeries selectMovieById={selectMovieById} tvSerieData={tvSerieData} />
      );
    } else {
      return <Movie />;
    }
  };

  return (
    <section className="moovies section">
      <Hero />

      {renderComponents()}
    </section>
  );
};

export default AllMovies;
