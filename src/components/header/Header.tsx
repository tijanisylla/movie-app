import { FC, useState, useEffect, useContext, useRef, Fragment } from "react";
import "./Header.css";
import ContextAll from "../context/ContextAll";
import { signOut } from "firebase/auth";
import { auth } from "../auth/authMethods";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import Profile from "../Profile/Profile";
import AllList from "../list/AllList";
const Header: FC = () => {
  /* ========== Toogle Menu ==========  */
  const [Toogle, setToggle] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [type, setType] = useState<any>(null);
  const [imgAvatar, setImgAvatar] = useState<string | null | undefined>(null);

  // Context

  const {
    openList,
    setOpenList,
    searchList,
    setSearchList,
    searchValue,
    setSearchValue,
    setSelectedMovie,
    openLogin,
    setOpenLogin,
    openProfile,
    setOpenProfile,
  } = useContext(ContextAll);

  const [user] = useAuthState(auth) as null | any;
  const [openAvatar, setAvatar] = useState<boolean>(false);
  const avtarRef = useRef<HTMLDivElement>(null);
  const listSerchRef = useRef<HTMLDivElement>(null);

  // const imgAvatar: string | null | undefined =

  /* ========== Change Background Navbar ==========  */
  // When the scroll is higher than 200 viewport height, add the scroll-header class to tag with the header tag
  const headerListener = (): void => {
    const headerPosition = document.querySelector(".header") as HTMLElement;

    if (window.scrollY >= 80 && headerPosition !== null)
      headerPosition.classList.add("scroll-header") as void;
    else headerPosition.classList.remove("scroll-header") as void;
  };

  useEffect(() => {
    if (user) {
      setImgAvatar(auth.currentUser?.providerData[0].photoURL);
    }
  }, [user]);

  // I am calling the function headerListener in here.
  useEffect((): void => {
    window.addEventListener("scroll", headerListener);
  }, []);
  // close avatar when click outside
  useEffect(() => {
    const handleClickOutside = (e: any): void => {
      if (avtarRef.current && !avtarRef.current.contains(e.target)) {
        setAvatar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avtarRef]);

  // close search list when click outside
  useEffect(() => {
    const handleClickOutside = (e: any): void => {
      if (listSerchRef.current && !listSerchRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listSerchRef]);

  useEffect(() => {
    // Search
    const searchAll = async (): Promise<void> => {
      if (searchValue === "") {
        setOpenSearch(false);
        return;
      }
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/search/multi",
        {
          params: {
            api_key: "3da275bf12ccf72038f506c6228b9293",
            language: "en-US",
            query: searchValue,
            page: 1,
            include_adult: false,
          },
        }
      );

      // chack type of searchmovie
      if (data.results[0].media_type === "") {
        setType("movie");
      } else if (data.results[0].media_type === "tv") {
        setType("tv");
      }
      setSearchList(
        data.results.filter((item: any) => item.media_type !== "person")
      );
      setOpenSearch(true);
    };

    searchAll();
  }, [searchValue, type, setSearchList]);

  // Fetch Movie or Tv by id
  const fetchMovieOrTv = async (id: number, type: string): Promise<void> => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}`,
      {
        params: {
          api_key: "3da275bf12ccf72038f506c6228b9293",
          language: "en-US",
        },
      }
    );
    setSelectedMovie(data);
  };

  // Select Movie or Tv
  const handleSelectMovieOrTv = async (item: any) => {
    await fetchMovieOrTv(item.id, item.media_type);
    setOpenSearch(false);
    setSearchValue("");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (searchValue) {
      setOpenSearch(true);
    }
  }, [searchValue, openSearch]);

  // Log out
  const logOut = async (): Promise<void> => {
    await signOut(auth);
  };

  const handleOpenAvatar = () => {
    setOpenProfile(!openProfile);
  };
  const renderUserAvatar = () => {
    if (user) {
      return (
        <Fragment>
          {/* Avatar */}
          <div
            className="nav__login-avatar"
            ref={avtarRef}
            onClick={() => setAvatar(!openAvatar)}
          >
            <img src={`${imgAvatar}`} alt="avatar" />
            {/* Options */}
            <div
              className={`${
                openAvatar
                  ? "nav__login-options show-options"
                  : "nav__login-options close-options"
              }`}
            >
              <ul>
                <li className="nav__login-options-link">
                  <h3 className="nav__login-options-link--name">
                    {auth.currentUser?.providerData[0].displayName}
                  </h3>
                </li>
                <hr className="nav__search-list-item-line" />
                <li
                  className="nav__login-options-link"
                  onClick={handleOpenAvatar}
                >
                  Profile <i className="uil uil-user profile-icon"></i>
                </li>
                <li
                  className="nav__login-options-link"
                  onClick={() => {
                    setOpenList(true);
                  }}
                >
                  My list <i className="uil uil-list-ul list-icon"></i>
                </li>

                <li onClick={logOut}>
                  Log out <i className="uil uil-sign-out-alt logout-icon"></i>
                </li>
              </ul>
            </div>
          </div>
        </Fragment>
      );
    }
  };

  return (
    <header className="header">
      <nav className="nav container">
        {openProfile && <Profile />}
        {openList && <AllList />}

        {/* Logo */}
        <div className="nav__logo">
          <a
            href="/#"
            className="scroll-link"
            // reload the page
            onClick={() => window.location.reload()}
          >
            {/* logo img */}
            <img
              src={require("../assets/sylla-movies-high-resolution-logo-color-on-transparent-background.png")}
              alt="logo"
            />
          </a>
        </div>

        {/* Menu */}
        <div
          className={Toogle ? "nav__menu show-menu" : "nav__menu close-menu"}
          ref={listSerchRef}
        >
          <ul className="nav__list grid">
            {/* Search */}
            <li className="nav__item">
              <div className="nav__search">
                <input
                  type="text"
                  placeholder="Search for a movie..."
                  className="nav__search-input"
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(e.target.value)
                  }
                />
                <i className="uil uil-search nav__search-icon"></i>
              </div>
            </li>
            {/* List with Filter data  */}
            <div
              className={`${
                openSearch
                  ? "nav__search-list show-search-list"
                  : "nav__search-list close-search-list"
              }`}
            >
              {/* Content */}
              <div className="nav__search-list-container">
                {searchList
                  .filter(
                    (item: any) =>
                      item.media_type !== "person" &&
                      item.poster_path !== null &&
                      item.backdrop_path !== null
                  )

                  .map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        handleSelectMovieOrTv(item);
                      }}
                    >
                      <div className="nav__search-list-item">
                        {/* search icon */}
                        {item.media_type === "movie" ? (
                          <i className="uil uil-film"></i>
                        ) : (
                          <i className="uil uil-tv-retro"></i>
                        )}
                        <img
                          src={`${
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiZgo9xf5oU7e02LvhlgibSF3690aKftWaGhzyq7OV&s`
                          }`}
                          alt="poster"
                        />

                        <div className="nav__search-list-item-info">
                          <h3 className="nav__search-list-item-title">
                            {item.title ? item.title : item.name}
                          </h3>
                          <span className="nav__search-list-item-year">
                            {item.release_date
                              ? item.release_date
                              : item.first_air_date
                              ? item.first_air_date
                              : "No Results"}
                          </span>
                        </div>
                      </div>
                      {/* If the last item dont show the hr */}
                      {searchList.indexOf(item) !== searchList.length - 1 && (
                        <hr className="nav__search-list-item-line" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            {/* Home */}
            <li className="nav__item">
              <a
                className="nav__link"
                href="/#moovies__hero"
                onClick={() => {
                  setToggle(!Toogle);
                  window.scrollTo(0, 0);
                }}
              >
                Home
              </a>
            </li>

            <li className="nav__item">
              <a
                className="nav__link"
                href="#filter"
                onClick={() => setToggle(!Toogle)}
              >
                Movies
              </a>
            </li>

            <li className="nav__item">
              <a
                className="nav__link"
                href="#filter"
                onClick={() => setToggle(!Toogle)}
              >
                Tv-Series
              </a>
            </li>

            {/* Login/Register */}
            <li className="nav__login">
              {user ? (
                renderUserAvatar()
              ) : (
                <span
                  className="nav__login-btn"
                  onClick={() => {
                    setOpenLogin(!openLogin);
                    setToggle(!Toogle);
                  }}
                >
                  Login/Register <i className="uil uil-user"></i>
                </span>
              )}
            </li>
          </ul>

          <i
            className="uil uil-times nav__close"
            onClick={() => setToggle(!Toogle)}
          ></i>
          <div></div>
        </div>

        <div
          className={`nav__toggle ${Toogle && "nav__toggle__close"}`}
          onClick={() => setToggle(!Toogle)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
