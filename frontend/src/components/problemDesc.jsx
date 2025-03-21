import React from "react";

const ProblemDesc = ({ title, url, description, type }) => {
  return (
    <div className="max-w-3xl mx-auto p-5 text-white rounded-lg">
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#A59DE6] text-center mb-2">
        {title}
      </h1>

      {/* Source Link */}
      <p className="text-center text-base text-gray-400 mb-4">
        Source:{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#388fe3] no-underline"
        >
          {type}
        </a>
      </p>

      {/* Description with line breaks */}
<div className="text-[17px] text-[#ffc9f2]">
  {description.split("<br/>").map((line, index) => (
    <p key={index} className="mb-2">
      {line.split(/(10\d+)/g).map((part, i) =>
        /^10\d+$/.test(part) ? (
          <span key={i}>
            10<sup>{part.slice(2)}</sup>
          </span>
        ) : (
          part
        )
       )} {/* for 10x to 10^x */}
    </p>
  ))}
</div>

    </div>
  );
};

export default ProblemDesc;
