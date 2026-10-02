import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Check } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useModalStore } from "../../store/useModalStore";

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { openModal } = useModalStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  // initials for the placeholder avatar (e.g., "Meri Sanikidze" -> "MS")
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="absolute top-0 left-0 z-40 w-full bg-transparent pt-[30px] pb-[40px]">
      {/* Logo */}
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-6 px-6 md:px-[60px]">
        <div className="flex items-center gap-9">
          <Link to="/">
            <img src="/images/logo.svg" alt="brand-logo" />
          </Link>

          <Link to="/sessions" className="text-[12px] font-semibold uppercase">
            Sessions
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[706px] items-center gap-[32px]">
          <div className="relative w-full max-w-[380px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <path
                d="M7.96867 7.96867L11 11M9.25 4.875C9.25 7.29125 7.29125 9.25 4.875 9.25C2.45875 9.25 0.5 7.29125 0.5 4.875C0.5 2.45875 2.45875 0.5 4.875 0.5C7.29125 0.5 9.25 2.45875 9.25 4.875Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search films and live events"
              className="w-full rounded-full bg-[#FFFFFF1A]/10 py-3 pl-11 pr-4 text-sm transition-all focus:border-[#EC3013] focus:outline-none focus:ring-1 focus:ring-[#EC3013]"
            />
          </div>

          {/* Profile and authorization */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => openModal("register")}
                  className="text-sm bg-[#EC3013] px-[22px] py-[13px] font-extrabold rounded-full hover:bg-red-700 transition duration-300"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => openModal("login")}
                  className="text-sm bg-[#FFFFFF] px-[22px] py-[13px] font-extrabold rounded-full text-[#070C1C] transition duration-300 hover:text-[#FFFFFF] hover:bg-[#070C1C]"
                >
                  Log In
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  {/* Блок аватара с позиционированным индикатором в правом нижнем углу */}
                  <div className="relative flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="h-10 w-10 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E2031] text-sm font-bold text-white">
                        {getInitials(user?.fullName || user?.username)}
                      </div>
                    )}

                    {/* Точка статуса профиля на краю аватара */}
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 translate-x-1/4 translate-y-1/4 rounded-full ring-2 ring-[#070C1C] ${
                        user?.profileComplete ? "bg-[#4ADE80]" : "bg-[#E27E04]"
                      }`}
                      title={
                        user?.profileComplete
                          ? "Profile Complete"
                          : "Profile Incomplete"
                      }
                    />
                  </div>

                  <span className="text-sm font-semibold text-white">
                    {user?.fullName || user?.username}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-slate-300 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-[302px] rounded-2xl border border-slate-800 bg-[#070C1C] p-5 z-50">
                    {/* top - user info */}
                    <div className="flex items-center gap-3.5 mb-4">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="h-12 w-12 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E2337] text-base font-bold text-white">
                          {getInitials(user?.fullName || user?.username)}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-base font-bold text-white truncate">
                          {user?.fullName || user?.username}
                        </span>
                        <span className="text-xs text-slate-400 truncate">
                          {user?.email}
                        </span>
                      </div>
                    </div>

                    {user?.profileComplete ? (
                      <div className="mb-5 flex items-center justify-center gap-2 rounded-2xl bg-[#0F2D24] py-3.5 px-4 text-sm font-bold text-[#22C55E] border border-[#155E3B]/40">
                        <span>Profile Complete</span>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="mb-1 rounded-2xl bg-[#E27E041A] p-3 p-2.5">
                        <p className="text-sm font-semibold text-[#E27E04]">
                          Profile incomplete
                        </p>
                        <p className="mt-0.5 text-xs text-[#A9A9A9]">
                          Please complete your profile to enable booking
                        </p>
                      </div>
                    )}

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/profile");
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold text-white transition-colors hover:bg-[#151A2E]"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99964 2.00049C7.37507 2.00049 6.76452 2.1857 6.24521 2.53269C5.72589 2.87968 5.32114 3.37288 5.08213 3.94991C4.84311 4.52694 4.78058 5.16189 4.90242 5.77446C5.02427 6.38703 5.32503 6.94971 5.76667 7.39135C6.20831 7.83299 6.77099 8.13375 7.38357 8.2556C7.99614 8.37745 8.63108 8.31491 9.20811 8.0759C9.78514 7.83688 10.2783 7.43213 10.6253 6.91282C10.9723 6.3935 11.1575 5.78296 11.1575 5.15838C11.1575 4.32086 10.8248 3.51763 10.2326 2.92541C9.64039 2.33319 8.83717 2.00049 7.99964 2.00049ZM7.99964 7.05312C7.6249 7.05312 7.25857 6.942 6.94698 6.7338C6.63539 6.5256 6.39254 6.22969 6.24913 5.88347C6.10572 5.53725 6.0682 5.15628 6.14131 4.78874C6.21442 4.4212 6.39488 4.08359 6.65986 3.8186C6.92484 3.55362 7.26245 3.37316 7.63 3.30005C7.99754 3.22694 8.37851 3.26447 8.72472 3.40787C9.07094 3.55128 9.36686 3.79414 9.57506 4.10572C9.78325 4.41731 9.89438 4.78364 9.89438 5.15838C9.89438 5.6609 9.69475 6.14283 9.33942 6.49816C8.98409 6.8535 8.50216 7.05312 7.99964 7.05312ZM13.6839 14.0005V13.3689C13.6839 12.1964 13.2181 11.0719 12.389 10.2428C11.5598 9.41364 10.4353 8.94786 9.2628 8.94786H6.73648C5.56395 8.94786 4.43943 9.41364 3.61033 10.2428C2.78122 11.0719 2.31543 12.1964 2.31543 13.3689V14.0005H3.57859V13.3689C3.57859 12.5314 3.91129 11.7282 4.50351 11.1359C5.09573 10.5437 5.89896 10.211 6.73648 10.211H9.2628C10.1003 10.211 10.9035 10.5437 11.4958 11.1359C12.088 11.7282 12.4207 12.5314 12.4207 13.3689V14.0005H13.6839Z"
                            fill="white"
                          />
                        </svg>

                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/profile?tab=tickets");
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold text-white transition-colors hover:bg-[#151A2E]"
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

                        <span>My Tickets</span>
                      </button>
                    </div>

                    <div className="my-3 border-t border-[#FFFFFF1A]" />

                    {/* log out */}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[#EC3013] transition-colors hover:bg-red-500/10"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9355 2.31299C12.898 2.31299 13.6855 3.09611 13.6855 4.06299V11.938C13.6855 12.9005 12.9024 13.688 11.9355 13.688H9.74805C9.63201 13.688 9.52073 13.6419 9.43869 13.5598C9.35664 13.4778 9.31055 13.3665 9.31055 13.2505C9.31055 13.1345 9.35664 13.0232 9.43869 12.9411C9.52073 12.8591 9.63201 12.813 9.74805 12.813H11.9355C12.1676 12.813 12.3902 12.7208 12.5543 12.5567C12.7184 12.3926 12.8105 12.1701 12.8105 11.938V4.06299C12.8105 3.83092 12.7184 3.60836 12.5543 3.44427C12.3902 3.28018 12.1676 3.18799 11.9355 3.18799H9.74805C9.63201 3.18799 9.52073 3.14189 9.43869 3.05985C9.35664 2.9778 9.31055 2.86652 9.31055 2.75049C9.31055 2.63446 9.35664 2.52318 9.43869 2.44113C9.52073 2.35908 9.63201 2.31299 9.74805 2.31299H11.9355Z"
                          fill="#EC3013"
                        />
                        <path
                          d="M5.06657 5.0691C5.14908 4.98941 5.2596 4.94531 5.37431 4.94631C5.48902 4.9473 5.59875 4.99331 5.67987 5.07443C5.76098 5.15555 5.80699 5.26528 5.80799 5.37999C5.80899 5.4947 5.76489 5.60521 5.6852 5.68773L3.80395 7.56897H9.7452C9.86123 7.56897 9.97251 7.61507 10.0546 7.69712C10.1366 7.77916 10.1827 7.89044 10.1827 8.00647C10.1827 8.12251 10.1366 8.23379 10.0546 8.31583C9.97251 8.39788 9.86123 8.44397 9.7452 8.44397H3.80395L5.6852 10.3252C5.76489 10.4077 5.80899 10.5183 5.80799 10.633C5.80699 10.7477 5.76098 10.8574 5.67987 10.9385C5.59875 11.0196 5.48902 11.0656 5.37431 11.0666C5.2596 11.0676 5.14908 11.0235 5.06657 10.9439L2.44157 8.31885C2.35955 8.23681 2.31348 8.12555 2.31348 8.00954C2.31348 7.89353 2.35955 7.78227 2.44157 7.70023L5.06657 5.07523V5.0691Z"
                          fill="#EC3013"
                        />
                      </svg>

                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
