import bg1 from "./assets/bg-1.jpg";
import bg2 from "./assets/bg-2.jpg";
import bg3 from "./assets/bg-3.jpg";
import bg4 from "./assets/bg-4.png";
import bg5 from "./assets/bg-5.jpg";

const PRESETS = { bg1, bg2, bg3, bg4, bg5 };

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  /* ---------- Background ---------- */
  const applyPresetBackground = (key) => {
    localStorage.setItem("custom_bg_type", "preset");
    localStorage.setItem("custom_bg_value", key);
    document.documentElement.style.setProperty(
      "--custom-bg",
      `url(${PRESETS[key]})`
    );
  };

  const uploadBackground = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("custom_bg_type", "upload");
      localStorage.setItem("custom_bg_value", reader.result);
      document.documentElement.style.setProperty(
        "--custom-bg",
        `url(${reader.result})`
      );
    };
    reader.readAsDataURL(file);
  };

  const resetBackground = () => {
    localStorage.removeItem("custom_bg_type");
    localStorage.removeItem("custom_bg_value");
    document.documentElement.style.setProperty("--custom-bg", "none");
  };

  
  const DropBox = ({ title, subtitle, onFile, accept }) => (
    <label
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onFile(e.dataTransfer.files[0]);
      }}
      className="flex flex-col items-center justify-center h-24 rounded-xl
                 border border-black/10 bg-black/5 hover:bg-black/10
                 cursor-pointer transition text-center"
    >
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs text-black/50">{subtitle}</span>
      <input
        type="file"
        hidden
        accept={accept}
        onChange={(e) => onFile(e.target.files[0])}
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="w-[480px] rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl">

        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold">Settings</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-6 space-y-6">

          <div>
            <p className="text-sm mb-2 text-black/70">Background presets</p>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(PRESETS).map((key) => (
                <button
                  key={key}
                  onClick={() => applyPresetBackground(key)}
                  className="h-12 rounded-lg overflow-hidden border hover:ring-2 ring-blue-500"
                  style={{
                    backgroundImage: `url(${PRESETS[key]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
          </div>

          <DropBox
            title="Custom background"
            subtitle="Drag & drop or click"
            accept="image/*"
            onFile={uploadBackground}
          />

          <button
            onClick={resetBackground}
            className="text-xs text-red-500 hover:underline"
          >
            Reset background
          </button>


        </div>

        <div className="px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
