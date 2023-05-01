import { createContext } from "react";

interface TypeContext {
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  withGenre: string;
  setWithGenre: (withGenre: string) => void;
  carousel: number;
  setCarousel: (carousel: number) => void;
  mylist: number[];
  setMylist: (mylist: number[]) => void;
  openList: boolean;
  setOpenList: (openList: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  searchList: string[];
  setSearchList: (searchList: string[]) => void;
  selectedMovie: any;
  setSelectedMovie: (seletedMovie: any) => void;
  openLogin: boolean;
  setOpenLogin: (openLogin: boolean) => void;
  openProfile: boolean;
  setOpenProfile: (openProfile: boolean) => void;

  addToMyList: (id: number) => void;
  api_key: string;
}

const contextState: TypeContext = {
  currentFilter: "",
  currentPage: 1,
  setCurrentPage: (currentPage: number) => void {},
  setCurrentFilter: (currentFilter: string) => void {},
  withGenre: "",
  setWithGenre: (withGenre: string) => void {},
  carousel: 0,
  setCarousel: (carousel: number) => void {},
  mylist: [],
  setMylist: (mylist: number[]) => void {},
  openList: false,
  setOpenList: (openList: boolean) => void {},
  loading: false,
  setLoading: (loading: boolean) => void {},
  searchValue: "",
  setSearchValue: (searchValue: string) => void {},
  searchList: [],
  setSearchList: (searchList: string[]) => void {},
  selectedMovie: {},
  setSelectedMovie: (seletedMovie: any) => void {},
  openLogin: false,
  setOpenLogin: (openLogin: boolean) => void {},
  openProfile: false,
  setOpenProfile: (openProfile: boolean) => void {},
  addToMyList: (id: number) => void {},
  api_key: "",
};

const ContextAll = createContext<TypeContext>(contextState);
export default ContextAll;
