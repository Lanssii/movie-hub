import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto flex flex-col max-w-[1920px] px-[20px] md:px-[32px]">
        <div className="w-full border-t border-[#2A2C3D]" />
        <div className="flex items-center justify-between py-5">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="brand-logo"
              className="w-[62px] h-[15px]"
            />
          </Link>

          <p className="text-[14px] text-[#A9A9A9]">
            &copy; 2026 Kino XII. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
