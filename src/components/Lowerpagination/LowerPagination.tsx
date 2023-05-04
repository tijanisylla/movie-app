import { useState, useContext, useEffect } from "react";
import ContextAll from "../context/ContextAll";
import axios from "axios";
import "./LowerPagination.css";

const LowerPagination = () => {
  const { currentPage, setCurrentPage, currentFilter } = useContext(ContextAll);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState(5);

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
    <div className="lower-pagination">
      <div className="lower-pagination-dots">
        <button onClick={prevPage} disabled={currentPage === 1 ? true : false}>
          {/* 3 <<< icon  */}
          <i className="uil uil-angle-double-left"></i>
        </button>

        {Array(pages)
          .fill(0)
          .map((_, i) => {
            // If the current page is greater than 5 then the pages will be 5 to 9 and so on ... and if the current page is less than 5 then the pages will be 1 to 5 and so on ...
            if (currentPage > 5) {
              return (
                <div
                  key={i}
                  className={`lower-pagination-dots__item ${
                    currentPage === i + currentPage - 4
                      ? "lower-pagination-dots__item--active"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + currentPage - 4}
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  className={`lower-pagination-dots__item ${
                    currentPage === i + 1
                      ? "lower-pagination-dots__item--active"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </div>
              );
            }
          })}
      </div>

      <div className="lower-pagination-dots">
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages ? true : false}
        >
          {/* 3 >>> icon  */}
          <i className="uil uil-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};

export default LowerPagination;
