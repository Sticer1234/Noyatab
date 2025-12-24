import { useEffect, useState } from "react";
import jalaali from "jalaali-js";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const monthNames = [
  "فروردین","اردیبهشت","خرداد","تیر",
  "مرداد","شهریور","مهر","آبان",
  "آذر","دی","بهمن","اسفند"
];

export default function PersianCalendar() {
  const today = new Date();
  const jToday = jalaali.toJalaali(today);

  const [year, setYear] = useState(jToday.jy);
  const [month, setMonth] = useState(jToday.jm);
  const [calendarData, setCalendarData] = useState({});
  const [selectedDay, setSelectedDay] = useState(jToday.jd);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pnldev.com/api/calender?year=${year}&month=${month}`
        );
        const data = await res.json();
        if (data.status) {
          setCalendarData(data.result);
        } else {
          setCalendarData({});
        }
      } catch (e) {
        setCalendarData({});
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [year, month]);

  const changeMonth = (dir) => {
    setSelectedDay(null);
    if (dir === "next") {
      if (month === 12) {
        setMonth(1);
        setYear(y => y + 1);
      } else {
        setMonth(m => m + 1);
      }
    } else {
      if (month === 1) {
        setMonth(12);
        setYear(y => y - 1);
      } else {
        setMonth(m => m - 1);
      }
    }
  };

  const goToToday = () => {
    setYear(jToday.jy);
    setMonth(jToday.jm);
    setSelectedDay(jToday.jd);
  };

  const daysInMonth = jalaali.jalaaliMonthLength(year, month);

  let offset = 0;
  if (calendarData["1"]?.gregorian?.dayWeek) {
    const map = {
      Sat: 0,
      Sun: 1,
      Mon: 2,
      Tue: 3,
      Wed: 4,
      Thu: 5,
      Fri: 6,
    };
    offset = map[calendarData["1"].gregorian.dayWeek];
  }

  return (
    <div className="w-full max-w-md mx-auto  text-white rounded-3xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth("prev")}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20"
        >
          ‹
        </button>

        <div className="font-bold text-lg">
          {monthNames[month - 1]} {year}
        </div>

        <button
          onClick={() => changeMonth("next")}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20"
        >
          ›
        </button>
      </div>

      <div className="text-center mb-3">
        <button
          onClick={goToToday}
          className="px-3 py-1 bg-blue-500 rounded-full text-sm"
        >
          بازگشت به امروز
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-400 mb-2">
        {weekDays.map(d => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const info = calendarData[day];
          const isHoliday = info?.holiday;
          const isFriday = info?.gregorian?.dayWeek === "Fri";
          const isToday =
            day === jToday.jd &&
            month === jToday.jm &&
            year === jToday.jy;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                w-9 h-9 rounded-full text-sm flex items-center justify-center
                ${isFriday || isHoliday ? "text-red-400" : ""}
                ${isToday ? "ring-2 ring-yellow-400" : ""}
                ${
                  selectedDay === day
                    ? "bg-blue-400 text-black"
                    : "bg-white/5 hover:bg-white/15"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 min-h-[60px] text-sm text-center">
        {loading && <div className="text-gray-400">در حال دریافت...</div>}

        {!loading &&
          selectedDay &&
          calendarData[selectedDay]?.event?.length > 0 && (
            <div className="space-y-1">
              {calendarData[selectedDay].event.map((e, i) => (
                <div key={i}>• {e}</div>
              ))}
            </div>
          )}

        {!loading &&
          selectedDay &&
          !calendarData[selectedDay]?.event && (
            <div className="text-gray-500">مناسبتی ثبت نشده</div>
          )}
      </div>
    </div>
  );
}
