import { useState, useEffect } from "react";

import "./App.css";
import SearchBox from "./searchbox.jsx";
import mainLogo from "./assets/logo-1.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Clock from "./clock.jsx";
import Bookmarks from "./bookmarks.jsx";
import { FaUserCircle } from "react-icons/fa";
import Weather from "./weather.jsx";
import { TiWeatherCloudy } from "react-icons/ti";
import Workbench from "./workbench.jsx";
import PersianCalendar from "./persiancalendar.jsx";
import SettingsModal from "./settingsmodal.jsx";

import jalaali from "jalaali-js";

import bg1 from "./assets/bg-1.jpg";
import bg2 from "./assets/bg-2.jpg";
import bg3 from "./assets/bg-3.jpg";
import bg4 from "./assets/bg-4.png";
import bg5 from "./assets/bg-5.jpg";

const PRESETS = {
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
};

const getTodayJalali = () => {
  const now = new Date();
  const j = jalaali.toJalaali(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  return {
    day: j.jd,
    monthName: months[j.jm - 1],
  };
};

const today = getTodayJalali();

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const bgType = localStorage.getItem("custom_bg_type");
    const bgValue = localStorage.getItem("custom_bg_value");

    if (bgType === "preset" && PRESETS[bgValue]) {
      document.documentElement.style.setProperty(
        "--custom-bg",
        `url(${PRESETS[bgValue]})`
      );
    }

    if (bgType === "upload" && bgValue) {
      document.documentElement.style.setProperty(
        "--custom-bg",
        `url(${bgValue})`
      );
    }


  }, []);

  return (
    <>
      <div className="fixed w-full h-[100vh] overflow-y-auto" id="style-4">
        <div className="flex items-center min-w-full p-8">
          <div className="flex items-cenr w-full justify-between text-neutral-c">
            <div className="flex">
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex overflow-hidden w-10 h-10 justify-center rounded-xl bg-black/25 backdrop-blur-2xl text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                  <img src={mainLogo} alt="" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-black/30 backdrop-blur-lg outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-4 text-center text-neutral-100">
                    <h1 className="text-lg mb-2 font-bold">
                      FocusTab{" "}
                      <span className="text-sm bg-blue-500 px-2 rounded-full font-normal">
                        BETA
                      </span>
                    </h1>

                    <p>
                      طراحی و توسعه توسط
                      <br />
                      <a
                        href="https://parsahasani.ir"
                        className="text-green-300"
                        target="blank"
                      >
                        <b>پارسا حسنی</b>
                      </a>
                    </p>
                  </div>
                </MenuItems>
              </Menu>
              <Clock />
            </div>

            <div className="gap-3 flex">
              <Menu as="div" className="relative inline-block">
                <MenuButton className="flex items-center w-[40px] justify-center h-[40px] rounded-xl bg-black/25 backdrop-blur-2xl font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                  <FaUserCircle className="text-xl" />
                </MenuButton>

                <MenuItems className="absolute -right-46 z-10 mt-2 w-56 rounded-md bg-gray-800">
                  <MenuItem>
                    <button
                      onClick={() => setSettingsOpen(true)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5"
                    >
                      Settings
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>

              <Menu as="div" className="relative inline-block">
                <MenuButton className="flex items-center w-[40px] justify-center h-[40px] rounded-xl bg-black/25 backdrop-blur-2xl text-white hover:bg-white/20">
                  <div>
                    <span className="block text-[20px] translate-y-1">
                      {today.day}
                    </span>
                    <span className="text-[10px] block -translate-y-1">
                      {today.monthName}
                    </span>
                  </div>
                </MenuButton>

                <MenuItems className="absolute -right-70 mt-2 w-80 bg-black/30 backdrop-blur-lg rounded-3xl">
                  <PersianCalendar />
                </MenuItems>
              </Menu>

              <Menu as="div" className="relative inline-block">
                <MenuButton className="flex items-center w-[40px] justify-center h-[40px] rounded-xl bg-black/25 backdrop-blur-2xl text-white hover:bg-white/20">
                  <TiWeatherCloudy />
                </MenuButton>

                <MenuItems className="absolute -right-50 mt-2 w-60 bg-black/30 backdrop-blur-lg rounded-3xl">
                  <Weather />
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 py-[calc(var(--spacing)*5)]">
          <SearchBox />
          <Bookmarks className="-z-12" />
          <Workbench />
        </div>
      </div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}

export default App;
