import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import codingLogo from "../assets/coding-terminal-svgrepo-com 1 (1).svg";

const Header = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const words = ["Coding", "Sleeping", "Eating"];
  const typingSpeed = 150;
  const deletingSpeed = 150;
  const pauseTime = 500;

  const stuckRef = useRef(null);
  const codeRef = useRef(null);
  const searchRef = useRef(null);
  const typeRef = useRef(null);
  const mobRef = useRef(null);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setIsTyping(false);
        timer = setTimeout(() => {
          setIsTyping(true);
        }, pauseTime);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, []);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(stuckRef.current, { x: -800, rotation: 40 }, { x: 0, rotation: 0, duration: 2, ease: "expo.out" });
    gsap.fromTo(typeRef.current, { y: -400, rotation: 30 }, { y: 0, rotation: 0, duration: 2, delay: 1.5, ease: "bounce.out" });
    gsap.fromTo(searchRef.current, { y: -800 }, { y: 0, duration: 2, delay: 0.5, ease: "expo.out" });
    gsap.fromTo(codeRef.current, { x: 800, rotation: -40 }, { x: 0, rotation: 0, duration: 2, delay: 1, ease: "expo.out" });
    gsap.fromTo(mobRef.current, { y: -800, rotation: 30 }, { y: 0, rotation: 0, duration: 2, delay: 1, ease: "bounce.out" }); 
  }, []);

  return (
    <header className="w-full bg-[#262A2B] py-3">
      <div className="hidden lg:grid mt-8 h-[280px] px-12 w-full max-w-[1200px] mx-auto gap-5 grid-flow-col grid-cols-7 grid-rows-2">
        {/* Stuck? */}
        <div ref={stuckRef} className="bg-[#353A3C] rounded-lg flex items-center justify-center text-7xl font-semibold text-[#FF9792] row-span-2 col-span-2">
          Stuck?
        </div>

        {/* I'm Codi_ */}
        <div ref={typeRef} className="bg-[#4E5558] rounded-lg flex items-center justify-center text-3xl font-bold text-gray-200 col-span-2 row-span-1">
          <div className="flex items-center">
            I'm{" "}
            <span className="ml-2 text-4xl font-bold text-[#F7FE72]">
              {text}
            </span>
            <span className={`inline-block ml-1 h-1 w-3 bg-white -mb-8 animate-blink`}></span>
          </div>
        </div>

        {/* Search It. */}
        <div ref={searchRef} className="bg-[#1F175A] rounded-lg flex items-center justify-center text-5xl font-bold text-[#FFC9F2] col-span-3 row-span-1 border-4 border-[#67004D]">
          Search It.
        </div>

        {/* Code it. */}
        <div ref={codeRef} className="bg-[#353A3C] rounded-lg flex flex-col items-center justify-center text-7xl text-[#FF9792] col-span-2 row-span-2">
          <div className="mb-px">Code</div>
          <div className="flex items-center space-x-4">
            <span className="text-[#FF9792]">it.</span>
            <img src={codingLogo} alt="Terminal Logo" className="text-[#92e9dc] h-15 w-15 mt-2" />
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div ref={mobRef} className="lg:hidden flex flex-col items-center justify-center p-4">
        <div className="text-3xl text-[#ffb0ac] mb-2">Stuck?</div>
        <div className="text-xl text-[#f7fe72] mb-2">
          I'm <span>{text}</span>
          <span className={`h-6 w-1 ml-1 bg-white inline-block ${isTyping ? "animate-pulse" : "invisible"}`}></span>
        </div>
        <div className="text-2xl text-[#fffbfe] mb-2 border-2 border-[#ffb0ac] p-2 rounded">
          Search It.
        </div>
        <div className="text-3xl text-[#ffb0ac] flex items-center">
          Code it.
          <img src={codingLogo} alt="Terminal Logo" className="h-6 w-6 ml-2" />
        </div>
      </div>
    </header>
  );
};

export default Header;
