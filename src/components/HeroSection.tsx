import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HERO_MOVIES } from "../data/heroMovies";
import { useModalStore } from "../store/useModalStore";
import { useAuthStore } from "../store/useAuthStore";

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();

  const currentMovie = HERO_MOVIES[currentIndex];

  // auto slider every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_MOVIES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_MOVIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_MOVIES.length);
  };

  const handleBuyTickets = (movieId: number) => {
    if (!isAuthenticated) {
      openModal("login", () => navigate(`/movie/${movieId}`));
      return;
    }
    navigate(`/movie/${movieId}`);
  };

  return (
    <section className="relative w-full h-[760px] bg-[#070C1C] flex flex-col justify-between overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentMovie.backdropUrl}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0000001A] via-[#070C1C]/60 to-transparent w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0000001A] via-transparent to-[#070C1C]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-6 md:px-[67px] pt-[160px] pb-[84px] flex-1 flex flex-col justify-center">
        <div className="max-w-[580px] animate-in fade-in duration-500">
          <span className="text-[12px] font-semibold uppercase text-[#EC3013] bg-[#EC30131A] rounded-full px-1.5 py-2.5">
            {currentMovie.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold  md:text-[30px] lg:text-[40px] uppercase mt-3 md:mt-5 mb-4 md:mb-[15px]">
            {currentMovie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-white mb-[15px]">
            <span className="text-[#EC3013] bg-[#EC30131A] rounded-full px-3 py-[6px]">
              {currentMovie.ageRating}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#FFFFFF1A] px-3 py-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 7.4375L9.1875 5.25M5.6875 0.875H8.3125M11.8125 7.4375C11.8125 10.0954 9.65787 12.25 7 12.25C4.34213 12.25 2.1875 10.0954 2.1875 7.4375C2.1875 4.77963 4.34213 2.625 7 2.625C9.65787 2.625 11.8125 4.77963 11.8125 7.4375Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {currentMovie.duration}
            </span>
            {currentMovie.formats.map((fmt) => (
              <span
                key={fmt}
                className="rounded-full bg-[#FFFFFF1A] px-3 py-1.5 uppercase"
              >
                {fmt}
              </span>
            ))}
          </div>

          <p className="text-sm line-clamp-4">{currentMovie.description}</p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 mt-3 md:mt-5">
            <button
              onClick={() => handleBuyTickets(currentMovie.id)}
              className="flex items-center gap-1 bg-[#EC3013] hover:bg-red-700 font-extrabold text-sm px-[22px] py-[13px] rounded-full transition duration-300 cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.93907 0.586073C8.1248 0.40027 8.34531 0.252879 8.58802 0.152318C8.83072 0.0517584 9.09086 0 9.35357 0C9.61628 0 9.87642 0.0517584 10.1191 0.152318C10.3618 0.252879 10.5823 0.40027 10.7681 0.586073L11.4981 1.31707C11.7981 1.61707 11.7661 2.06007 11.5541 2.33707C11.3374 2.62593 11.2323 2.98324 11.2578 3.34341C11.2834 3.70357 11.4381 4.04242 11.6934 4.29773C11.9487 4.55305 12.2876 4.7077 12.6477 4.7333C13.0079 4.7589 13.3652 4.65372 13.6541 4.43707L13.7661 4.36707C13.9109 4.28799 14.0774 4.25754 14.2409 4.28023C14.4043 4.30292 14.5562 4.37753 14.6741 4.49307L15.4141 5.23307C16.1941 6.01407 16.1941 7.28207 15.4141 8.06307L13.5961 9.88007L12.2371 8.52107C12.1428 8.42999 12.0165 8.3796 11.8854 8.38074C11.7543 8.38188 11.6289 8.43446 11.5362 8.52716C11.4435 8.61987 11.3909 8.74527 11.3897 8.87637C11.3886 9.00747 11.439 9.13377 11.5301 9.22807L12.8891 10.5871L8.06107 15.4151C7.87534 15.6009 7.65483 15.7483 7.41213 15.8488C7.16942 15.9494 6.90929 16.0011 6.64657 16.0011C6.38386 16.0011 6.12372 15.9494 5.88102 15.8488C5.63831 15.7483 5.4178 15.6009 5.23207 15.4151L4.49207 14.6751C4.19207 14.3751 4.22407 13.9331 4.43607 13.6551L4.50607 13.5581C4.69619 13.2614 4.7758 12.9073 4.73096 12.5578C4.68611 12.2083 4.51968 11.8858 4.26083 11.6468C4.00198 11.4077 3.66724 11.2674 3.3153 11.2505C2.96336 11.2335 2.61669 11.341 2.33607 11.5541C2.05807 11.7661 1.61507 11.7981 1.31407 11.4981L0.586073 10.7681C0.40027 10.5823 0.252879 10.3618 0.152318 10.1191C0.0517584 9.87642 0 9.61628 0 9.35357C0 9.09086 0.0517584 8.83072 0.152318 8.58802C0.252879 8.34531 0.40027 8.1248 0.586073 7.93907L5.41307 3.11107L6.76307 4.46107C6.85737 4.55215 6.98368 4.60255 7.11477 4.60141C7.24587 4.60027 7.37128 4.54769 7.46398 4.45498C7.55669 4.36228 7.60927 4.23687 7.61041 4.10577C7.61155 3.97468 7.56115 3.84837 7.47007 3.75407L6.12007 2.40407L7.93907 0.586073ZM9.23707 5.52207C9.14277 5.43099 9.01647 5.3806 8.88537 5.38174C8.75427 5.38287 8.62887 5.43546 8.53616 5.52816C8.44346 5.62087 8.39088 5.74627 8.38974 5.87737C8.3886 6.00847 8.43899 6.13477 8.53007 6.22907L9.76307 7.46207C9.85737 7.55315 9.98368 7.60355 10.1148 7.60241C10.2459 7.60127 10.3713 7.54869 10.464 7.45598C10.5567 7.36328 10.6093 7.23787 10.6104 7.10677C10.6115 6.97568 10.5612 6.84937 10.4701 6.75507L9.23707 5.52207Z"
                  fill="white"
                />
              </svg>

              <span>Buy tickets</span>
            </button>

            <button
              onClick={() => navigate("/sessions")}
              className="rounded-full bg-[#FFFFFF1A] px-[22px] py-[13px] font-bold text-sm transition duration-300 cursor-pointer"
            >
              All sessions
            </button>
          </div>
        </div>
      </div>

      {/* bottom slider navigation lines */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-6 md:px-[60px] pb-10 flex items-center justify-between gap-6">
        <div className="flex-1 max-w-[800px] flex items-center gap-[7px]">
          {HERO_MOVIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer"
            >
              <div
                className={`h-full bg-[#EC3013] transition-all duration-300 ${
                  idx === currentIndex ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#070C1C33] hover:bg-white/20 transition duration-300 cursor-pointer"
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2499 8.5C21.2499 8.5 12.75 14.7602 12.75 17.0001C12.75 19.24 21.25 25.5 21.25 25.5"
                stroke="white"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#070C1C33] hover:bg-white/20 transition duration-300 cursor-pointer"
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7501 8.5C12.7501 8.5 21.25 14.7602 21.25 17.0001C21.25 19.24 12.75 25.5 12.75 25.5"
                stroke="white"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
