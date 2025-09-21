import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useExpToken } from "./useExpToken";

interface CountdownTimerProps {
  exp: number;
}

export const useCountdownTime = ({ exp }: CountdownTimerProps) => {

  const router = useRouter();
  const [prevTime, setPrevTime] = useState({ minutes: 0, seconds: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const time = useExpToken({ exp });

  const parseTime = (timeString: number | string) => {
    if (!timeString || timeString === '00:00') return { minutes: 0, seconds: 0 };
    const [minutes, seconds] = timeString.toString().split(':').map(Number);
    return { minutes: minutes || 0, seconds: seconds || 0 };
  };

  const { minutes, seconds } = parseTime(time);

  const totalMinutes = minutes;
  const mins = totalMinutes % 60;
  const secs = seconds;

  useEffect(() => {
    setPrevTime({ minutes, seconds });
  }, [minutes, seconds]);

  useEffect(() => {
    if (time && time !== '00:00') {
      setIsLoading(false);
    }
  }, [time]);

  useEffect(() => {
    if (!isLoading && minutes === 0 && seconds === 0) {
      router.replace("/success");
    }
  }, [isLoading, minutes, seconds, router]);


  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return {
    totalMinutes,
    mins,
    secs,
    formatNumber,
    isLoading,
    prevTime
  }
}