import React from "react";
import { Link } from "react-router-dom";
import { ComingSoonCard } from "./common/ComingSoonCard";
import { MOCK_COMING_SOON } from "../data/comingSoonMovies";

export const ComingSoonSection: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-6 md:px-[67px] py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white">
          Coming Soon...
        </h2>

        <Link
          to="/sessions"
          className="text-xs font-bold uppercase text-[#EC3013] hover:underline transition-all"
        >
          See all
        </Link>
      </div>

      <div className="flex items-center gap-5 overflow-x-auto pb-4 scrollbar-none">
        {MOCK_COMING_SOON.map((movie) => (
          <ComingSoonCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
