import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../searchBar";
import SearchResults from "../searchResults";
import loadingIcon from "../../assets/Dual-Ball.svg";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const removeFocus = () => {
    const inputField = document.getElementById("question");
    if (inputField) inputField.blur();
  };

  useEffect(() => {
    removeFocus();
    // Try to get cached results
    const cached = sessionStorage.getItem("searchCache");
    let cacheObj = null;
    if (cached) {
      try {
        cacheObj = JSON.parse(cached);
      } catch {}
    }
    if (
      cacheObj &&
      cacheObj.query === query &&
      Array.isArray(cacheObj.results)
    ) {
      setResults(cacheObj.results);
      setLoading(false);
    } else {
      setLoading(true);
      fetch(`${backendUrl}/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
          sessionStorage.setItem(
            "searchCache",
            JSON.stringify({ query, results: data })
          );
        })
        .catch(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className="min-h-min flex flex-col bg-[#262A2B] text">
      {/* Search Bar */}
      <SearchBar initialQuery={query} />
      {/* Search Results */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <img src={loadingIcon} alt="Loading..." className="w-30 h-30" />
        </div>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
};

export default SearchPage;
