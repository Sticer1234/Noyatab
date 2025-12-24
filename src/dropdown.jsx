import { useState } from "react";

export default function Dropdown({ label, items, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-3 mx-6 text-right">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center
          px-4 py-2
          bg-white border rounded-xl
          text-black/90
          shadow-sm
          hover:bg-gray-50
          transition
          text-xs
        "
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || label}
        </span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {open && (
        <div
          className="
            absolute z-20 mt-2 w-full
            max-h-60 overflow-y-auto
            rounded-xl
            shadow-lg
            bg-gray-700 backdrop-blur-lg
            no-scrollbar
          "
        >
          {items.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="
                px-4 py-2 cursor-pointer
                hover:bg-gray-600
                transition
                text-sm
              "
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
