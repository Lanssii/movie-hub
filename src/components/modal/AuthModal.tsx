import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "../../store/useModalStore";
import {
  useAuthStore,
  loginSchema,
  registerSchema,
} from "../../store/useAuthStore";

type AuthFormValues = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: any;
};

export const AuthModal: React.FC = () => {
  const { activeModal, closeModal, openModal, pendingAction } = useModalStore();
  const { setUser } = useAuthStore();

  const isLogin = activeModal === "login";
  const isOpen = activeModal !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [activeModal, reset]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const onSubmit = (data: AuthFormValues) => {
    setUser({
      id: 1,
      username: data.username || "LanaShot",
      email: data.email,
      avatar: data.avatar?.[0] ? URL.createObjectURL(data.avatar[0]) : null,
      fullName: "Lana Shotashvili",
      mobileNumber: "599123456",
      dateOfBirth: "2005-02-01",
      age: 21,
      preferredVenue: null,
      profileComplete: true,
    });

    closeModal();

    if (pendingAction) {
      pendingAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070C1C]/20 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={closeModal} />

      <div className="relative w-full max-w-[475px] rounded-[28px] border border-[#2A2C3D] bg-[#070C1C] p-8 sm:p-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] z-10">
        <button
          onClick={closeModal}
          className="absolute right-8 top-9 text-[#FFFFFF] hover:text-[#EC3013] transition-colors cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.9792 5.96654L11.8388 1.10689C11.9481 0.979367 12.0051 0.815328 11.9986 0.647556C11.9922 0.479784 11.9226 0.320636 11.8039 0.201915C11.6852 0.0831934 11.526 0.0136432 11.3583 0.00716286C11.1905 0.000682555 11.0264 0.0577495 10.8989 0.166959L6.03926 5.02661L1.17961 0.160293C1.05209 0.0510832 0.888047 -0.00598315 0.720275 0.000497155C0.552503 0.00697746 0.393356 0.0765271 0.274634 0.195248C0.155913 0.313969 0.0863629 0.473117 0.0798825 0.640889C0.0734022 0.808661 0.130469 0.9727 0.239679 1.10023L5.09933 5.96654L0.233013 10.8262C0.16323 10.886 0.106554 10.9595 0.066541 11.0422C0.0265283 11.1249 0.00404283 11.215 0.000496751 11.3068C-0.00304932 11.3986 0.0124202 11.4901 0.0459342 11.5757C0.0794481 11.6612 0.130283 11.7389 0.195249 11.8039C0.260214 11.8689 0.337906 11.9197 0.42345 11.9532C0.508994 11.9867 0.600543 12.0022 0.692349 11.9986C0.784155 11.9951 0.874237 11.9726 0.956941 11.9326C1.03964 11.8926 1.11318 11.8359 1.17295 11.7661L6.03926 6.90648L10.8989 11.7661C11.0264 11.8753 11.1905 11.9324 11.3583 11.9259C11.526 11.9194 11.6852 11.8499 11.8039 11.7312C11.9226 11.6125 11.9922 11.4533 11.9986 11.2855C12.0051 11.1178 11.9481 10.9537 11.8388 10.8262L6.9792 5.96654Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-extrabold">
            {isLogin ? "Log in" : "Sign up"}
          </h2>
          <p className="mt-2 text-xs text-[#A9A9A9]">
            {isLogin ? "Welcome back to Kino XII" : "  Welcome to Kino XII"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label className="flex items-center gap-3 rounded-xl cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2031] text-[#505261] hover:bg-[#25283d] transition-colors border border-transparent">
                    <svg
                      width="12"
                      height="11"
                      viewBox="0 0 12 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3 10.7998C2.20435 10.7998 1.44129 10.4837 0.87868 9.92109C0.316071 9.35844 0 8.59532 0 7.79961V5.99946C0 5.84032 0.0632141 5.68769 0.175736 5.57516C0.288258 5.46263 0.44087 5.39941 0.6 5.39941C0.75913 5.39941 0.911742 5.46263 1.02426 5.57516C1.13679 5.68769 1.2 5.84032 1.2 5.99946V7.79961C1.2 8.27703 1.38964 8.73491 1.72721 9.0725C2.06477 9.41009 2.52261 9.59975 3 9.59975H9C9.47739 9.59975 9.93523 9.41009 10.2728 9.0725C10.6104 8.73491 10.8 8.27703 10.8 7.79961V5.99946C10.8 5.84032 10.8632 5.68769 10.9757 5.57516C11.0883 5.46263 11.2409 5.39941 11.4 5.39941C11.5591 5.39941 11.7117 5.46263 11.8243 5.57516C11.9368 5.68769 12 5.84032 12 5.99946V7.79961C12 8.59532 11.6839 9.35844 11.1213 9.92109C10.5587 10.4837 9.79565 10.7998 9 10.7998H3Z"
                        fill="#505261"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.17074 3.66022C3.11558 3.60386 3.07207 3.53718 3.04269 3.464C3.01332 3.39081 2.99866 3.31255 2.99955 3.23369C3.00044 3.15484 3.01687 3.07693 3.04789 3.00443C3.07891 2.93192 3.12392 2.86625 3.18034 2.81115L5.88034 0.170941C5.99244 0.0613559 6.14298 0 6.29974 0C6.4565 0 6.60704 0.0613559 6.71914 0.170941L9.41914 2.81115C9.47668 2.86595 9.52277 2.93163 9.55473 3.00438C9.58669 3.07714 9.60388 3.15552 9.6053 3.23497C9.60672 3.31442 9.59235 3.39337 9.56302 3.46722C9.53369 3.54107 9.48998 3.60837 9.43444 3.66519C9.37889 3.72201 9.31261 3.76723 9.23944 3.79823C9.16628 3.82923 9.08769 3.84538 9.00823 3.84576C8.92877 3.84613 8.85003 3.83072 8.77658 3.80042C8.70312 3.77011 8.63642 3.72551 8.58034 3.66922L6.89974 2.02569V7.2005C6.89974 7.35964 6.83652 7.51227 6.724 7.6248C6.61148 7.73733 6.45887 7.80055 6.29974 7.80055C6.14061 7.80055 5.988 7.73733 5.87547 7.6248C5.76295 7.51227 5.69974 7.35964 5.69974 7.2005V2.02569L4.01974 3.66922C3.96339 3.72438 3.89671 3.7679 3.82353 3.79727C3.75035 3.82665 3.6721 3.84131 3.59325 3.84042C3.5144 3.83953 3.4365 3.8231 3.364 3.79208C3.2915 3.76105 3.22583 3.71604 3.17074 3.65962V3.66022Z"
                        fill="#505261"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-extrabold">
                      Upload avatar (optional)
                    </span>
                    <span className="text-xs text-[#A9A9A9]">
                      JPG, PNG or WEBP
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    {...register("avatar")}
                  />
                </label>
                {errors.avatar && (
                  <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="User"
                  className="w-full rounded-xl bg-[#1E2031] py-3 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1
                  focus:ring-[#EC3013]"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold mb-2.5">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-xl bg-[#1E2031] py-3 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1
              focus:ring-[#EC3013]"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>

          {!isLogin ? (
            <div>
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-semibold mb-2.5">
                    password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-[#1E2031] py-3 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1
                  focus:ring-[#EC3013]"
                    {...register("password")}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-semibold mb-2.5">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-[#1E2031] py-3 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1
                  focus:ring-[#EC3013]"
                    {...register("confirmPassword")}
                  />
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                  {errors.password.message}
                </p>
              )}
              {errors.confirmPassword && (
                <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#1E2031] py-3 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1
                focus:ring-[#EC3013]"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-[#505261] hover:bg-[#EC3013] py-3.5 text-xs font-bold text-white transition-all hover:bg-red-700 active:scale-95 cursor-pointer mt-4"
          >
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#A9A9A9]">
          {isLogin ? (
            <p>
              Don't have an account?
              <button
                type="button"
                onClick={() => openModal("register")}
                className="font-bold text-[#EC3013] hover:underline cursor-pointer ml-1"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?
              <button
                type="button"
                onClick={() => openModal("login")}
                className="font-extrabold text-[#EC3013] hover:underline cursor-pointer ml-2"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
