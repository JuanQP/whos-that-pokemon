import { SECOND } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "./useInterval";

export function useTimer(callback: () => void, seconds: number) {

  const savedCallback = useRef(() => {});
  const [remainingTime, setRemainingTime] = useState(seconds);
  const [runInterval, setRunInterval] = useState(true);
  const [done, setDone] = useState(false);

  // Keep always the last version of the callback
  useEffect(() => {
    savedCallback.current = callback;
  });

  useInterval(() => {
    setRemainingTime(previous => previous - 1);
  }, runInterval ? 1000 : null);

  useEffect(() => {
    if(seconds === null) return

    const id = window.setTimeout(() => {
      savedCallback.current();
      setDone(true);
      setRunInterval(false);
    }, seconds * SECOND);

    return () => clearTimeout(id);
  }, [seconds]);

  return {
    remainingTime,
    done,
  }
}
