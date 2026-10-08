import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, ChevronDown, Check } from "lucide-react";
import { useAuthStore, profileSchema } from "../store/useAuthStore";
import type { ProfileFormData } from "../store/useAuthStore";

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"personal" | "tickets">(
    "personal"
  );
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || user?.username || "",
      email: user?.email || "",
      mobileNumber: user?.mobileNumber || "",
      dateOfBirth: user?.dateOfBirth || "",
      preferredVenue: user?.preferredVenue || "",
    },
  });

  // Automatically update field values when usser data changes in zustand
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || user.username || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        preferredVenue: user.preferredVenue || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070C1C] flex flex-col justify-between">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-[60px] pt-[140px] pb-20 flex-1">
        <h1 className="text-2xl font-extrabold mb-7">My Profile</h1>

        {/* Tabs - Personal Information and My Tickets */}
        <div className="flex items-center gap-8 border-b border-[#2A2C3D] mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={`pb-[14px] text-sm font-semibold transition-all relative cursor-pointer ${
              activeTab === "personal"
                ? "text-[#FFFFFF]"
                : "text-[#A9A9A9] hover:text-[#FFFFFF]"
            }`}
          >
            Personal Information
            {activeTab === "personal" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EC3013]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tickets")}
            className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer flex items-center gap-2 ${
              activeTab === "tickets"
                ? "text-[#FFFFFF]"
                : "text-[#A9A9A9] hover:text-[#FFFFFF]"
            }`}
          >
            <span>My Tickets</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EC3013] text-[12px] font-semibold">
              2
            </span>
            {activeTab === "tickets" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EC3013]" />
            )}
          </button>
        </div>

        {activeTab === "personal" ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[880px] space-y-[18px]"
          >
            {/* Fullname */}
            <div>
              <label className="block text-xs font-semibold mb-2.5">
                Fullname
              </label>
              <input
                type="text"
                placeholder="Meri Sanikidze"
                className={`w-full rounded-xl bg-[#1E2031] py-3.5 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1 ${
                  errors.fullName
                    ? "border border-[#EC3013] focus:ring-[#EC3013]"
                    : "border border-transparent focus:ring-[#505261]"
                }`}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email (Disabled) */}
            <div>
              <label className="block text-xs font-semibold mb-2.5">
                Email
              </label>
              <input
                type="email"
                disabled
                className="w-full rounded-xl bg-[#1E2031]/50 py-3.5 px-4 text-xs text-[#A9A9A9] border border-transparent cursor-not-allowed"
                {...register("email")}
              />
              <p className="mt-2 text-[11px] text-[#A9A9A9]">
                Set at registration and cannot be changed
              </p>
            </div>

            {/* Mobile number */}
            <div>
              <label className="block text-xs font-semibold mb-2.5">
                Mobile number
              </label>
              <input
                type="text"
                placeholder="555 123 456"
                className={`w-full rounded-xl bg-[#1E2031] py-3.5 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1 ${
                  errors.mobileNumber
                    ? "border border-[#EC3013] focus:ring-[#EC3013]"
                    : "border border-transparent focus:ring-[#505261]"
                }`}
                {...register("mobileNumber")}
              />
              {errors.mobileNumber && (
                <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* Date of birth */}
            <div>
              <label className="block text-xs font-semibold mb-2.5">
                Date of birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  className={`w-full rounded-xl bg-[#1E2031] py-3.5 px-4 text-xs placeholder-[#A9A9A9] focus:outline-none focus:ring-1 appearance-none ${
                    errors.dateOfBirth
                      ? "border border-[#EC3013] focus:ring-[#EC3013]"
                      : "border border-transparent focus:ring-[#505261]"
                  }`}
                  {...register("dateOfBirth")}
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A9A9A9] pointer-events-none" />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-2 text-[12px] text-[#EC3013] font-semibold">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Preferred Venue */}
            <div>
              <label className="block text-xs font-semibold mb-2.5">
                Preferred Venue (Optional)
              </label>
              <div className="relative">
                <select
                  className="w-full rounded-xl bg-[#1E2031] py-3.5 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-[#505261] border border-transparent appearance-none cursor-pointer"
                  {...register("preferredVenue")}
                >
                  <option value="">e.g. Tbilisi Cavea East</option>
                  <option value="cavea-galleria">Cavea Galleria Tbilisi</option>
                  <option value="cavea-city-mall">Cavea City Mall</option>
                  <option value="cavea-east-point">Cavea East Point</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A9A9A9] pointer-events-none" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center gap-4">
              <button
                type="submit"
                className="rounded-full bg-[#EC3013] hover:bg-red-700 px-8 py-3.5 text-sm font-extrabold transition-all active:scale-95 cursor-pointer"
              >
                Save changes
              </button>

              {isSaved && (
                <span className="flex gap-1 items-center text-xs text-green-400 font-semibold animate-in fade-in ">
                  <Check className="h-5 w-5" /> Profile updated successfully!
                </span>
              )}
            </div>
          </form>
        ) : (
          <div className="py-8 text-slate-400 text-sm">
            <p>Your booked tickets will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
