import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  return (
    <div className="max-w-5xl mx-auto p-5">
      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.slice(0, 6).map((item) => (
            <div key={item.id} className="bg-[#353A3C] p-4 rounded-lg">
              <Link
                to={`/problem/${item.problemId + 1}`}
                className="text-lg font-semibold text-[#3ab9c7] hover:text-[#A59DE6] transition duration-200 block"
              >
                {item.title}
              </Link>
              <div className="text-gray-300 text-sm mt-2 overflow-hidden line-clamp-4">
                {item.description.split("<br/>").map((line, index) => (
                  <p key={index} className="mb-2">
                    {line.split(/(10\d+)/g).map((part, i) =>
                      /^10\d+$/.test(part) ? (
                        <span key={i}>
                          10<sup>{part.slice(2)}</sup>
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
