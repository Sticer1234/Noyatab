import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";

const SLOTS = 4;

const getFavicon = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
};

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks"));
    return Array.isArray(saved) ? saved : Array(SLOTS).fill(null);
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const openModal = (index) => {
    setActiveIndex(index);
    setUrlInput(bookmarks[index]?.url || "");
    setTitleInput(bookmarks[index]?.title || "");
  };

  const closeModal = () => {
    setActiveIndex(null);
    setUrlInput("");
    setTitleInput("");
  };

  const saveBookmark = () => {
    if (!urlInput.trim()) return;

    const updated = [...bookmarks];
    updated[activeIndex] = {
      url: urlInput.trim(),
      title: titleInput.trim() || "بوکمارک",
    };

    setBookmarks(updated);
    closeModal();
  };

  const deleteBookmark = () => {
    const updated = [...bookmarks];
    updated[activeIndex] = null;
    setBookmarks(updated);
    closeModal();
  };

  return (
    <>
      <div className="mt-4 mx-auto translate-y-4 w-170 grid grid-cols-4 gap-x-20 gap-y-12 px-18 py-10">
        {bookmarks.map((item, i) => (
          <div
            key={i}
            className="
              group relative
              bg-white aspect-square rounded-2xl
              flex flex-col items-center justify-center
              shadow
            "
          >
            {!item && (
              <button
                type="button"
                onClick={() => openModal(i)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaPlus className="text-4xl" />
              </button>
            )}

            {item && (
              <>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center"
                >
                  <img
                    src={getFavicon(item.url)}
                    alt=""
                    className="w-7 h-7 mb-2"
                  />
                  <span className="text-xs text-gray-700 text-center line-clamp-1">
                    {item.title}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(i);
                  }}
                  className="
                    absolute top-2 right-2
                    opacity-0 group-hover:opacity-100
                    transition
                    bg-white rounded-full p-1 shadow
                  "
                >
                  <MdEdit size={16} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div className="relative z-10 w-80 bg-white rounded-2xl p-5 shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-center">
              مدیریت بوکمارک
            </h3>

            <input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="عنوان"
              className="w-full border rounded-xl px-3 py-2 mb-2 focus:outline-none"
            />

            <input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="لینک سایت (https://...)"
              className="w-full border rounded-xl px-3 py-2 mb-4 focus:outline-none"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={saveBookmark}
                className="flex-1 bg-black text-white py-2 rounded-xl"
              >
                ذخیره
              </button>

              {bookmarks[activeIndex] && (
                <button
                  type="button"
                  onClick={deleteBookmark}
                  className="bg-red-500 text-white px-4 rounded-xl"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmarks;
