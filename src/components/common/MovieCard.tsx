import React from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types";
import { useAuthStore } from "../../store/useAuthStore";
import { useModalStore } from "../../store/useModalStore";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();

  const primaryGenre = movie.genres?.[0]?.name || "Cinema";

  const handleBuyTicket = (e: React.MouseEvent) => {
    e.stopPropagation(); // clicking the button doesn't also trigger a click on the card itself

    if (!isAuthenticated) {
      // If not logged in, open the login modal and remember the navigation target.
      openModal("login", () => navigate(`/movie/${movie.id}`));
      // Do not trigger the navigation right now, The modal window (`openModal`) will open, the user will successfully log in and the code inside the modal will execute this stored function. As a result, the user will be automatically redirected to the desired movie immediately after authorization.
      return;
    }

    // if logged in, just navigate to the movie page
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group relative flex flex-col justify-between w-[220px] md:w-[260px] h-[412px] md:h-[452px] shrink-0 rounded-xl bg-[#1E2031] p-3 transition-all duration-300 hover:shadow-2xl hover:w-[340px] cursor-pointer"
    >
      {/* movie photo */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* movie info */}
      <div className="flex flex-col gap-[6px] pt-[10px] px-1">
        <h3 className="text-base font-extrabold text-white truncate group-hover:text-[#EC3013] transition-colors">
          {movie.title}
        </h3>

        <p className="text-xs text-[#A9A9A9]">
          {primaryGenre} · {movie.runtimeMinutes} min
        </p>

        {/* age badge */}
        <div className="pt-1">
          <span className="inline-block rounded-full bg-[#EC30131A] px-2 py-1 text-[12px] font-semibold text-[#EC3013]">
            {movie.ageRating?.code || "G"}
          </span>
        </div>
      </div>

      {/* price and buy ticket */}
      <div className="flex items-center justify-between pt-3 px-1">
        <span className="text-[12px] font-semibold">
          From &#x20BE;{movie.fromPrice}
        </span>

        <button
          onClick={handleBuyTicket}
          className="rounded-full bg-[#EC3013] px-[22px] py-[10px] text-[14px] font-extrabold transition-all hover:bg-red-600 cursor-pointer"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};
