import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 flex items-center bg-black/30 backdrop-blur-lg rounded-xl px-4 mr-3">
      <div className="text-3xl font-mono text-neutral-100 font-semibold translate-y-0.5 ">
        {time.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
