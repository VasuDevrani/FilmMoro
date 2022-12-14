import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { genres } from "../interfaces/movie";
import { CircularProgress } from "@mui/material";
import Categories from "./Categories";
import Genre from "./Genre";
import { getMovies } from "../features/films";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

interface Props {
  show: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ show, setToggle }: Props) => {
  const { dispatch } = useContext(Store);
  const [genres, setGenres] = useState<genres[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      try {
        setTimeout(async () => {
          const { data } = await axios.get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=9927d57067753126d627ab0540ed625a&language=en-US"
          );

          setGenres(data.genres);
        }, 500);
      } catch (err) {
        console.log(err);
      }
    };
    getGenres();
  }, []);

  return (
    <div
      className={`sidebar bg-white dark:bg-black absolute mid:relative mid:flex overflow-x-hidden ${
        show ? "translate-x-0" : "-translate-x-[100%]"
      } mid:translate-x-0 w-[14rem] sm:w-[20rem] mid:w-[17rem]  mid:flex-col h-[100vh] dark:bg-black overflow-scroll font-roboto dark:text-white z-[100] duration-300`}
    >
      <h1
        className="py-5 pb-3 text-center cursor-pointer font-bold text-sitePink text-3xl sm:text-4xl  font-logo"
        onClick={() => {getMovies(dispatch); navigate('/'); setToggle(!show)}}
      >
        FILMORO
      </h1>
      <hr className="w-[100%] bg-gray-700 my-2" />

      {/* categories */}
      <Categories show={show} setToggle={setToggle} />
      <hr className="w-[100%] bg-gray-100" />

      {/* genres */}
      <div className="genres text-[1.1rem]">
        <p className=" text-gray-500 text-sm py-3 sticky top-0 bg-white dark:bg-black z-40 px-5 sm:px-12 mid:px-5">
          Genres
        </p>
        {genres ? (
          genres.map((genre: genres) => (
            <Genre
              key={genre.id}
              name={genre.name}
              id={genre.id}
              show={show}
              setToggle={setToggle}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-[20vh]">
            <CircularProgress size={"2rem"} color="secondary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
