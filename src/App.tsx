import React, { useEffect, useState } from "react";

import {
  Header,
  AllMovies,
  Footer,
  ContextAll,
  AllList,
  Login,
  ScrollUp,
  Pagination,
  Loading,
} from "./components";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./components/auth/authMethods";

import "./App.css";
const App: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string>("Movies");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carousel, setCarousel] = useState<number>(0);
  const [mylist, setMylist] = useState<any>(null);
  const [openList, setOpenList] = useState<boolean>(false);
  const [withGenre, setWithGenre] = useState<string>("");
  const [user] = useAuthState(auth) as null | any;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchList, setSearchList] = useState<string[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const api_key =
    "3da275bf12ccf72038f506c6228b9293" ||
    (process.env.REACT_APP_MOVIE_API_KEY as string);

  useEffect(() => {
    const mylist = localStorage.getItem("myList");
    if (mylist) {
      setMylist(JSON.parse(mylist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(mylist) || "[]");
  }, [mylist]);

  useEffect(() => {}, [currentFilter]);

  useEffect(() => {
    if (searchValue.length > 0) {
      const search = searchValue.split(" ") as string[];
      setSearchList(search);
    } else {
      setSearchList([]);
    }
  }, [searchValue]);

  // Loading if the page is loading
  useEffect(() => {
    if (user) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [user]);

  const addToMyList = (item: any) => {
    if (mylist) {
      const exist = mylist.find((movie: any) => movie.id === item.id);
      if (!exist) {
        setMylist([...mylist, item]);
        alert("Added to My List");
      } else if (exist) {
        alert("Already in My List");
      }
    } else {
      setMylist([item]);
      alert("Added to My List");
    }
  };

  return (
    <ContextAll.Provider
      value={{
        currentFilter,
        setCurrentFilter,
        currentPage,
        setCurrentPage,
        withGenre,
        setWithGenre,
        carousel,
        setCarousel,
        mylist,
        setMylist,
        openList,
        setOpenList,
        loading,
        setLoading,
        searchValue,
        setSearchValue,
        searchList,
        setSearchList,
        selectedMovie,
        setSelectedMovie,
        openLogin,
        setOpenLogin,
        openProfile,
        setOpenProfile,
        addToMyList,
        api_key,
      }}
    >
      <div className="App">
        <Header />
        <main>
          <AllMovies />
          <AllList />
        </main>
        {loading && <Loading />}
        <Login />
        <ScrollUp />
        <Pagination />
        <Footer />
      </div>
    </ContextAll.Provider>
  );
};

export default App;
