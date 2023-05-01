import { useState, useContext, useEffect } from "react";
import "./pagination.css";
import ContextAll from "../context/ContextAll";
import axios from "axios";

const Pagination = () => {
  const { currentPage, setCurrentPage, currentFilter } = useContext(ContextAll);
  const [totalPages, setTotalPages] = useState(0);
  // total pages from the api moves and tv series data
  const API_URL: string = "https://api.themoviedb.org/3";

  // tv series pages
  useEffect(() => {
    if (currentFilter === "TV Shows") {
      const getTvSeries = async () => {
        const { data } = await axios.get(`${API_URL}/discover/tv`, {
          params: {
            api_key: "3da275bf12ccf72038f506c6228b9293",
          },
        });
        setTotalPages(data.total_pages);
        setCurrentPage(data.page);
      };
      getTvSeries();
    }
  }, [currentFilter, setCurrentPage]);

  // movies pages
  useEffect(() => {
    if (currentFilter === "Movies") {
      const getMovies = async () => {
        const { data } = await axios.get(`${API_URL}/discover/movie`, {
          params: {
            api_key: "3da275bf12ccf72038f506c6228b9293",
          },
        });
        setTotalPages(data.total_pages);
        setCurrentPage(data.page);
      };
      getMovies();
    }
  }, [currentFilter, setCurrentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={currentPage > 1 ? prevPage : () => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        <i className="uil uil-angle-left-b pagination__icon"></i>
      </button>
      <span className="pagination__page">{currentPage}</span>
      <span className="pagination__total">of {totalPages}</span>
      <button
        className="pagination__button"
        onClick={
          currentPage < totalPages ? nextPage : () => setCurrentPage(totalPages)
        }
        disabled={currentPage === totalPages}
      >
        <i className="uil uil-angle-right-b pagination__icon"></i>
      </button>
    </div>
  );
};

export default Pagination;
