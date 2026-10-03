import React from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { MOCK_NOW_PLAYING } from "../../data/nowPlayingMovies";

export const NowPlayingSection: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-6 md:px-[67px] py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl uppercase font-extrabold">
          Now Playing
        </h2>

        <Link
          to="/sessions"
          className="text-[14px] font-semibold text-[#EC3013] hover:underline transition-all"
        >
          See all
        </Link>
      </div>

      {/* Horizontal scroll */}
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
        {MOCK_NOW_PLAYING.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
