import { FC } from "react";

interface TvShowCardProps {
  tvSerieData: any;
  selectMovieById: (mov: any) => Promise<void>;
}
const TvSeries: FC<TvShowCardProps> = ({ tvSerieData, selectMovieById }) => {
  const img_path: string = `https://image.tmdb.org/t/p/w500/`;
  return (
    <div className="moovies__container container">
      {tvSerieData?.map((tv: any) => {
        const {
          title,
          poster_path,
          release_date,
          vote_average,
          first_air_date,
          id,
        } = tv;
        return (
          <div
            key={id}
            className="moovie__card "
            onClick={() => {
              selectMovieById({ id: id });
              window.scrollTo(0, 0);
            }}
          >
            <div className="moovie__card-info-overlay">
              <div className="moovie__card-info">
                {/* Icon play  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="var(--title-color-dark)"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-play"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
            <div className="moovie__card-footer">
              <div className="moovie__card-footer-info">
                {/* date  */}
                <svg
                  xmlns="http://www.w3.org/2000/
              svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather-calendar"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="moovie__card-footer-info-date">
                  {release_date
                    ? release_date.slice(0, 4)
                    : first_air_date.slice(0, 4)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather-star"
                >
                  <polygon points="12 2 15.25 9.25 22.6 9.25 17.4 14.4 19.75 21.75 12 17.25 4.25 21.75 6.6 14.4 1.4 9.25 8.75 9.25 12 2"></polygon>
                </svg>
                <span className="moovie__card-footer-info-rating">
                  {vote_average.toFixed(1)}
                </span>
                {/* Type Moovie */}
                <span className="moovie__card-footer-info-type">Show</span>
              </div>
            </div>
            {/* HD tag */}
            <span className="moovie__card-hd">HD</span>
            {poster_path ? (
              <img src={`${img_path}${poster_path}`} alt={title} />
            ) : (
              <p>No image</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TvSeries;
