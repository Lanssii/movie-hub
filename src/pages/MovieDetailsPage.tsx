import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MOCK_NOW_PLAYING } from "../data/nowPlayingMovies";
import { MOCK_COMING_SOON } from "../data/comingSoonMovies";
import { HERO_MOVIES } from "../data/heroMovies";

// Calendar mock data
const DATES = [
  { day: "15", label: "MON" },
  { day: "16", label: "TUE" },
  { day: "17", label: "WED" },
  { day: "18", label: "THU" },
  { day: "19", label: "FRI" },
  { day: "20", label: "SAT" },
  { day: "21", label: "SUN" },
];

// Mock sessions data
const VENUES = [
  {
    name: "Galleria Tbilisi",
    halls: [
      {
        hallName: "Hall 2",
        sessions: [
          { time: "12:00", price: "18", format: "MAX" },
          { time: "12:00", price: "18", format: "MAX" },
        ],
      },
      {
        hallName: "Hall 4",
        sessions: [
          { time: "12:00", price: "18", format: "MAX" },
          { time: "12:00", price: "18", format: "MAX" },
        ],
      },
    ],
  },
  {
    name: "Vake Park",
    halls: [
      {
        hallName: "Hall 2",
        sessions: [
          { time: "12:00", price: "18", format: "MAX" },
          { time: "12:00", price: "18", format: "MAX" },
        ],
      },
    ],
  },
];

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState("15");

  const numericId = Number(id);

  // Search for the movie in all available datasets
  const nowPlayingMovie = MOCK_NOW_PLAYING.find((m) => m.id === numericId);
  const comingSoonMovie = MOCK_COMING_SOON.find((m) => m.id === numericId);
  const heroMovie = HERO_MOVIES.find((m) => m.id === numericId);

  const price = nowPlayingMovie?.fromPrice || comingSoonMovie?.fromPrice || 16;

  // Combine the obtained data with safe defaults.
  const title =
    nowPlayingMovie?.title ||
    comingSoonMovie?.title ||
    heroMovie?.title ||
    "THE ODYSSEY";

  const poster =
    nowPlayingMovie?.posterUrl ||
    comingSoonMovie?.posterUrl ||
    "/images/trailer1.png";

  const backdrop =
    nowPlayingMovie?.backdropUrl ||
    comingSoonMovie?.backdropUrl ||
    heroMovie?.backdropUrl ||
    poster;

  const runtime =
    nowPlayingMovie?.runtimeMinutes || comingSoonMovie?.runtimeMinutes || 134;

  const ageCode =
    nowPlayingMovie?.ageRating?.code ||
    comingSoonMovie?.ageRating?.code ||
    heroMovie?.ageRating ||
    "12+";

  const formats = nowPlayingMovie?.formats?.map((f) => f.name) ||
    heroMovie?.formats || ["MAX", "PANORAMA"];

  const description =
    heroMovie?.description ||
    "While her husband maps a coast he will never sail, she keeps a second atlas of the places he leaves out, and it becomes the more accurate of the two.";

  const handleSessionClick = (session: { time: string; price: string }) => {
    console.log("Selected session for booking:", session);
    // place for modal
  };

  return (
    <div className="min-h-screen bg-[#070C1C]">
      {/* HERO BANNER */}
      <div className="relative w-full pt-[140px] pb-[40px] lg:min-h-[577px] flex flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 blur-xs"
          style={{ backgroundImage: `url('/images/trailer1.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070C1C33] via-[#070C1C]/70 to-transparent" />

        {/* Movie content */}
        <div className="relative mx-auto w-full max-w-[1800px] px-6 md:px-[60px] flex flex-col md:flex-row gap-8 items-center md:items-end z-10">
          <div className="w-full max-w-[289px] aspect-[289/374] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src={poster}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Name and details */}
          <div className="flex flex-col gap-[15px]">
            <span className="text-xs font-semibold uppercase text-[#EC3013] bg-[#EC30131A] rounded-full px-2.5 py-[6px] max-w-[105px]">
              NOW PLAYING
            </span>

            <h1 className="text-3xl md:text-[40px] font-extrabold">{title}</h1>

            <p className="max-w-[560px] text-sm">{description}</p>

            <div className="flex items-center gap-[7px] text-xs font-semibold">
              <span className="font-semibold text-[#EC3013] bg-[#FFFFFF1A] rounded-full px-2.5 py-[6px]">
                {ageCode}
              </span>
              <span className="flex gap-1 bg-[#FFFFFF1A] rounded-full px-2.5 py-[6px]">
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {runtime} Min
              </span>

              {formats.map((fmt, idx) => (
                <span
                  key={idx}
                  className="bg-[#FFFFFF1A] rounded-full px-2.5 py-[6px]"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[#2A2C3D]" />

      {/* Sessions */}
      <div className="mx-auto max-w-[1800px] px-6 md:px-[60px] py-12 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-[27px]">
          <h2 className="text-xl font-extrabold">Sessions</h2>

          {/* Calendar */}
          <div className="flex items-center gap-[7px] overflow-x-auto scrollbar-none">
            {DATES.map((item) => {
              const isSelected = selectedDate === item.day;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDate(item.day)}
                  className={`flex flex-col items-center justify-center w-full max-w-[80px] h-[80px] rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#EC3013] border-[#EC3013]"
                      : "bg-[#1E2031] border-transparent text-[#A9A9A9] hover:bg-[#25283d] hover"
                  }`}
                >
                  <span className="text-xs font-semibold">{item.label}</span>
                  <span className="text-lg font-extrabold">{item.day}</span>
                </button>
              );
            })}
          </div>

          {/* list halls */}
          <div className="space-y-6 pt-4">
            {VENUES.map((venue, idx) => (
              <div key={idx} className="space-y-3">
                {/* Venue */}
                <h3 className="text-sm font-extrabold">{venue.name}</h3>

                {/* Halls */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {venue.halls.map((hall, hIdx) => (
                    <div key={hIdx} className="rounded-[18px] bg-[#1E2031] p-3">
                      {/* Hall name */}
                      <span className="block text-xs font-semibold px-1">
                        {hall.hallName}
                      </span>

                      {/* Sessions */}
                      <div className="flex flex-wrap gap-2">
                        {hall.sessions.map((session, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSessionClick(session)}
                            className="relative flex items-stretch h-[76px] rounded-[12px] bg-[#080C1D] overflow-hidden cursor-pointer transition-all hover:bg-[#11162B] group"
                          >
                            {/* LEFT SIDE */}
                            <div className="flex flex-col justify-center gap-2 px-5 min-w-[124px]">
                              <span className="text-xl font-extrabold">
                                {session.time}
                              </span>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#A9A9A9]">
                                  ENG
                                </span>

                                <span className="rounded-full bg-[#2A2C3B] px-2 py-[2px] text-[9px] font-bold text-[#A9A9A9]">
                                  MAX
                                </span>
                              </div>
                            </div>

                            {/* DOTTED DIVIDER */}
                            <div className="relative flex items-center">
                              <div className="h-[54px] border-l border-dashed border-white/70" />

                              {/* ticket notches */}
                              <span className="absolute -left-[5px] -top-[4px] w-[10px] h-[10px] rounded-full bg-[#1E2031]" />
                              <span className="absolute -left-[5px] -bottom-[4px] w-[10px] h-[10px] rounded-full bg-[#1E2031]" />
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col justify-center items-center px-4 min-w-[90px]">
                              <span className="text-[18px] font-extrabold text-[#EC3013]">
                                &#8382; {session.price}
                              </span>

                              <span className="flex items-center justify-center gap-1 mt-2 text-xs text-[#A9A9A9] whitespace-nowrap">
                                <span>
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M5.95465 0.439523C6.09395 0.300181 6.25935 0.189645 6.44139 0.114231C6.62343 0.038816 6.81854 0 7.01559 0C7.21263 0 7.40775 0.038816 7.58979 0.114231C7.77182 0.189645 7.93722 0.300181 8.07652 0.439523L8.62405 0.987734C8.84907 1.21272 8.82507 1.54494 8.66606 1.75268C8.50356 1.96931 8.42468 2.23727 8.44388 2.50738C8.46307 2.77748 8.57907 3.0316 8.77057 3.22307C8.96207 3.41454 9.21622 3.53052 9.48635 3.54972C9.75649 3.56892 10.0245 3.49004 10.2411 3.32757L10.3252 3.27507C10.4338 3.21576 10.5587 3.19293 10.6813 3.20994C10.8039 3.22696 10.9178 3.28291 11.0062 3.36956L11.5612 3.92452C12.1463 4.51023 12.1463 5.46116 11.5612 6.04687L10.1976 7.40952L9.17834 6.39035C9.10761 6.32204 9.01288 6.28425 8.91455 6.2851C8.81622 6.28596 8.72216 6.32539 8.65262 6.39491C8.58309 6.46444 8.54365 6.55849 8.5428 6.6568C8.54194 6.75512 8.57974 6.84984 8.64806 6.92056L9.66737 7.93974L6.04615 11.5605C5.90685 11.6998 5.74146 11.8104 5.55942 11.8858C5.37738 11.9612 5.18226 12 4.98522 12C4.78817 12 4.59306 11.9612 4.41102 11.8858C4.22898 11.8104 4.06359 11.6998 3.92428 11.5605L3.36925 11.0055C3.14424 10.7805 3.16824 10.4491 3.32725 10.2406L3.37975 10.1678C3.52234 9.94535 3.58206 9.67979 3.54842 9.41769C3.51479 9.1556 3.38995 8.91372 3.19581 8.73444C3.00166 8.55517 2.75059 8.44995 2.48662 8.43724C2.22265 8.42453 1.96263 8.50514 1.75216 8.66493C1.54364 8.82392 1.21138 8.84792 0.985612 8.62294L0.43958 8.07548C0.30022 7.93619 0.18967 7.77082 0.114245 7.5888C0.038821 7.40679 0 7.2117 0 7.01468C0 6.81766 0.038821 6.62257 0.114245 6.44055C0.18967 6.25854 0.30022 6.09316 0.43958 5.95388L4.06004 2.33314L5.0726 3.34557C5.14333 3.41387 5.23806 3.45166 5.33639 3.45081C5.43472 3.44996 5.52878 3.41052 5.59831 3.341C5.66784 3.27147 5.70728 3.17743 5.70814 3.07911C5.70899 2.98079 5.67119 2.88607 5.60288 2.81535L4.59032 1.80293L5.95465 0.439523ZM6.92821 4.14126C6.85748 4.07295 6.76275 4.03516 6.66442 4.03601C6.56609 4.03687 6.47203 4.0763 6.40249 4.14583C6.33296 4.21535 6.29352 4.3094 6.29267 4.40771C6.29181 4.50603 6.32961 4.60075 6.39793 4.67147L7.32273 5.59615C7.39346 5.66446 7.48819 5.70225 7.58652 5.7014C7.68485 5.70054 7.77891 5.66111 7.84844 5.59159C7.91797 5.52206 7.95741 5.42802 7.95827 5.3297C7.95912 5.23138 7.92132 5.13666 7.85301 5.06594L6.92821 4.14126Z"
                                      fill="#A9A9A9"
                                    />
                                  </svg>
                                </span>
                                45 left
                              </span>
                            </div>

                            <span className="absolute left-[50%] -translate-x-1/2 -top-[5px] w-[10px] h-[10px] rounded-full bg-[#1E2031]" />
                            <span className="absolute left-[50%] -translate-x-1/2 -bottom-[5px] w-[10px] h-[10px] rounded-full bg-[#1E2031]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Movie details */}
        <div className="flex flex-col gap-4 w-full lg:w-[440px]">
          <h2 className="text-xl font-extrabold">Details</h2>

          <div className="space-y-4 text-xs font-semibold">
            <div>
              <span className="block uppercase text-[#A9A9A9] mb-[7px]">
                Director
              </span>
              <span>Ethan Coen, Joel Coen</span>
            </div>

            <div>
              <span className="block uppercase text-[#A9A9A9] mb-[7px]">
                Main Cast
              </span>
              <span>
                David Merheje, Rosi Lamm, Gigi Tsiklauri, Nikoloz Koberidze
              </span>
            </div>

            <div>
              <span className="block uppercase text-[#A9A9A9] mb-[7px]">
                Duration
              </span>
              <span>{runtime} minutes</span>
            </div>

            <div>
              <span className="block font-bold uppercase text-[#A9A9A9]">
                Release Date
              </span>
              <span>4 September 2026</span>
            </div>

            <div>
              <span className="block uppercase text-[#A9A9A9]">Formats</span>
              <span>{formats.join(", ")}</span>
            </div>

            <div>
              <span className="block uppercase text-[#A9A9A9]">From</span>
              <span> &#8382; {price}</span>
            </div>

            <div className="rounded-xl bg-[#E27E041A] p-[13px] space-y-1 max-w-[380px] w-full">
              <span className="block font-extrabold uppercase text-[#E27E04]">
                Rating Note:
              </span>
              <p className="flex gap-[7px] text-xs text-[#E27E04]">
                <span>{ageCode}</span> Not recommended for under-16s. Tickets
                require an account aged 16 or over.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
