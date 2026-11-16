"use client";

import { useEffect, useState } from "react";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(target: string): Remaining {
  const diff = new Date(target).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

type CountdownProps = {
  target: string;
  className?: string;
  itemClassName?: string;
  numberClassName?: string;
  labelClassName?: string;
};

export default function Countdown({
  target,
  className = "",
  itemClassName = "",
  numberClassName = "",
  labelClassName = "",
}: CountdownProps) {
  const [time, setTime] = useState<Remaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => setTime(getRemaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const items: Array<[string, number]> = [
    ["Hari", time.days],
    ["Jam", time.hours],
    ["Menit", time.minutes],
    ["Detik", time.seconds],
  ];

  return (
    <div className={className}>
      {items.map(([label, value]) => (
        <div key={label} className={itemClassName}>
          <span className={numberClassName}>
            {String(value).padStart(2, "0")}
          </span>
          <span className={labelClassName}>{label}</span>
        </div>
      ))}
    </div>
  );
}
