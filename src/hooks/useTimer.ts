import { useEffect, useState } from "react";

interface Props {
  seconds: number;
}

export function useTimer({ seconds }: Props) {
  const [remainingTime, setRemainingTime] = useState(seconds);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if(remainingTime === 0) {
      setDone(true);
      return;
    }

    const timeout = setTimeout(() => {
      setRemainingTime(previous => previous - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [remainingTime]);

  return {
    remainingTime,
    done,
  }
}
