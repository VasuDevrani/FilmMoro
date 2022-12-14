import { Rating, Tooltip } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../features/films";
import { Store } from "../Store"
import {FaBookDead} from 'react-icons/fa'

export default function MovieList() {
  const { state, dispatch } = useContext(Store);
  const { movies, page } = state;

  return (
    <div>
      <div className="movies p-10 md:px-24 sm:px-20 px-10 grid grid-cols-10 gap-10">
        {/* {movies.length === 0 ?  */}
        {movies.length === 0 ? (
          <div className="text-3xl flex gap-3">
            <FaBookDead/> <span className="text-sitePink hover:underline cursor-pointer" onClick={() => getMovies(dispatch)}> Go Back </span>
          </div>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col justify-between items-center"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://dummyimage.com/200x300/fff/aaa"
                  }
                  alt=""
                  className="object-contain cursor-pointer rounded-3xl shadow-lg hover:scale-105 duration-300"
                  loading="lazy"
                />
              </Link>
              <div className="text-area flex flex-col items-center justify-center">
                <Link to={`/movie/${movie.id}`}>
                  <h1 className="dark:text-white text-[1.4rem] py-2 font-medium cursor-pointer">
                    {movie.title.length < 15
                      ? movie.title
                      : movie.title.slice(0, 16) + "..."}
                  </h1>
                </Link>
                <Tooltip
                  disableTouchListener
                  title={`${movie.vote_average} / 10`}
                >
                  <Rating
                    readOnly
                    value={movie.vote_average / 2}
                    precision={0.1}
                  />
                </Tooltip>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination flex flex-row gap-5 items-center justify-center my-10">
        <button
          className={`util-btn uppercase ${
            page === 1 ? "bg-purple-200 line-through" : ""
          }`}
          onClick={() => dispatch({ type: "PREV_PAGE" })}
        >
          PREV
        </button>
        <h1 className="text-2xl dark:text-white">{page}</h1>
        <button
          className={`util-btn uppercase ${
            page === 30 || movies.length === 0
              ? "bg-purple-200 line-through"
              : ""
          }`}
          disabled={movies.length === 0}
          onClick={() => dispatch({ type: "NEXT_PAGE" })}
        >
          next
        </button>
      </div>
    </div>
  );
}
