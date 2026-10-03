import React from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types";
import { useAuthStore } from "../../store/useAuthStore";
import { useModalStore } from "../../store/useModalStore";

type ComingSoonCardProps = {
  movie: Movie;
};

export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();

  const primaryGenre = movie.genres?.[0]?.name || "Cinema";

  const formatReleaseDate = (dateStr: string) => {
    if (!dateStr) return "COMING SOON";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
    return `IN CINEMAS ${day} ${month}`;
  };

  const handleNotify = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      openModal("login", () => {
        console.log(`Subscribed to ${movie.title}`);
      });
      return;
    }

    console.log(`Notified for ${movie.title}`);
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group flex items-center gap-4 w-[380px] md:w-[470px] min-h-[140px] md:min-h-[160px] shrink-0 rounded-3xl bg-[#1E2031] p-3 cursor-pointer"
    >
      {/* movie image*/}
      <div className="relative h-[116px] md:h-[136px] w-[160px] md:w-[210px] shrink-0 overflow-hidden rounded-2xl">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* movie info */}
      <div className="flex flex-1 flex-col justify-between h-full py-1 min-w-0">
        <div className="flex flex-col gap-[4px]">
          <span className="text-[11px] md:text-[12px] font-semibold uppercase text-[#EC3013] truncate">
            {formatReleaseDate(movie.releaseDate)}
          </span>

          <h3 className="text-[10px] md:text-[12px] font-semibold group-hover:text-[#EC3013] transition-colors truncate">
            {movie.title}
          </h3>

          <p className="text-xs text-[#A9A9A9] truncate">
            {primaryGenre} · {movie.runtimeMinutes} min
          </p>

          <div className="mt-1">
            <span className="inline-block rounded-full bg-[#EC30131A] px-2.5 py-0.5 text-[11px] font-semibold text-[#EC3013]">
              {movie.ageRating?.code || "PG"}
            </span>
          </div>
        </div>

        {/* button Notify Me */}
        <div className="mt-2">
          <button
            onClick={handleNotify}
            className="flex items-center gap-1.5 rounded-full border border-[#A9A9A9] bg-transparent px-3 py-1.5 text-xs font-semibold  transition-all hover:border-white hover:bg-white/10 active:scale-95 cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99954 12.2505C5.99954 12.7809 6.21025 13.2896 6.58533 13.6647C6.9604 14.0398 7.46911 14.2505 7.99954 14.2505C8.52997 14.2505 9.03868 14.0398 9.41375 13.6647C9.78883 13.2896 9.99954 12.7809 9.99954 12.2505M11.4995 1.75049C12.4651 2.36656 13.2482 3.22974 13.7677 4.25049M2.23141 4.25049C2.7509 3.22974 3.53401 2.36656 4.49954 1.75049M3.49954 7.25049C3.49954 6.05701 3.97365 4.91242 4.81756 4.06851C5.66147 3.22459 6.80607 2.75049 7.99954 2.75049C9.19301 2.75049 10.3376 3.22459 11.1815 4.06851C12.0254 4.91242 12.4995 6.05701 12.4995 7.25049C12.4995 9.48924 13.0183 10.788 13.4308 11.5005C13.4746 11.5764 13.4977 11.6624 13.4978 11.75C13.4979 11.8377 13.4749 11.9238 13.4312 11.9997C13.3876 12.0757 13.3247 12.1388 13.2489 12.1828C13.1732 12.2269 13.0872 12.2502 12.9995 12.2505H2.99954C2.91203 12.25 2.82619 12.2265 2.75059 12.1824C2.675 12.1383 2.61231 12.0751 2.56878 11.9992C2.52525 11.9233 2.50242 11.8373 2.50255 11.7497C2.50268 11.6622 2.52578 11.5763 2.56954 11.5005C2.98141 10.788 3.49954 9.48861 3.49954 7.25049Z"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Notify Me</span>
          </button>
        </div>
      </div>
    </div>
  );
};
