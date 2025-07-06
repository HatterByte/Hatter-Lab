import React from "react";
import icons8Linkedin from "../assets/icons8-linkedin.svg";
import icons8Mail from "../assets/icons8-mail-50.png";
import icons8Github from "../assets/icons8-github.svg";

const Footer = () => {
  return (
    <footer className="bg-[#262A2B] text-center py-4">
      <div className="flex justify-center space-x-4 mb-2">
        <a
          href="https://www.linkedin.com/in/anubhav-chandak-8008292b0/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <img src={icons8Linkedin} alt="LinkedIn" className="w-8 h-8" />
        </a>
        <a href="mailto:hatterbyte@gmail.com" className="footer-link">
          <img src={icons8Mail} alt="Email" className="w-8 h-8" />
        </a>
        <a
          href="https://github.com/hatterbyte"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <img src={icons8Github} alt="GitHub" className="w-8 h-8" />
        </a>
      </div>
      <div className="text-[#858585] text-sm">
        &copy; 2025 Made by Hatter Byte
      </div>
    </footer>
  );
};

export default Footer;
