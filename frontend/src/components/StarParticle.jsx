import React, { useEffect } from "react";

const StarParticles = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/lib/particles.min.js";
    script.async = true;

    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: {
              value: 150,
              density: { enable: true, value_area: 1000 },
            },
            color: {
              value: ["#aa73ff", "#f8c210", "#83d238", "#33b1f8", "#ffffff"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                opacity_min: 0.3,
                sync: false,
              },
            },
            size: {
              value: 2.5,
              random: true,
              anim: {
                enable: true,
                speed: 3,
                size_min: 0.5,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 130,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.4,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: { opacity: 1 },
              },
            },
          },
          retina_detect: true,
        });
      } else {
        console.error("particlesJS not loaded");
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="particles-js"
      className="absolute inset-0 pointer-events-none z-0"
    ></div>
  );
};

export default StarParticles;
