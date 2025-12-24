import googlelogo from "./assets/g-logo.webp";
import { useEffect, useState } from "react";

const SearchBox = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (focused) {
      const saved = JSON.parse(localStorage.getItem("searches")) || [];
      setHistory(saved);
    }
  }, [focused]);

  const saveSearch = (query) => {
    const prev = JSON.parse(localStorage.getItem("searches")) || [];
    const updated = [query, ...prev.filter((q) => q !== query)].slice(0, 3);
    localStorage.setItem("searches", JSON.stringify(updated));
  };

  const search = (q = value) => {
    if (!q.trim()) return;
    saveSearch(q);
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
      q
    )}`;
  };

  return (
    <>
      {focused && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10" />
      )}

      <div
        className={`
          relative z-99 mx-auto w-170
          bg-white
          opacity-0 translate-y-5
          animate-[slideUpFade_1.2s_0.1s_cubic-bezier(0.25,0.8,0.25,1)_forwards]
          ${
            focused
              ? "rounded-t-3xl rounded-b-none"
              : "rounded-t-3xl rounded-b-3xl"
          }
        `}
      >
        <div
          className="
            flex items-center px-6 py-3.5
            transition-all duration-200"
        >
          <img src={googlelogo} alt="Google" className="w-5.5" />

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="جستجو..."
            className="w-full mx-3 focus:outline-none"
          />
        </div>

        {focused && history.length > 0 && (
          <div
            className="
              absolute top-full left-0 right-0
              bg-white
              rounded-b-3xl
              shadow-xl
              border-t border-gray-200/60
              overflow-hidden
            "
          >
            {history.map((item, index) => (
              <button
                key={index}
                onMouseDown={() => search(item)}
                className="
                  w-full text-right
                  px-6 py-2
                  text-sm
                  hover:bg-gray-100
                  transition
                "
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBox;
