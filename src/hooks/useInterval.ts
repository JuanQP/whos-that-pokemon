import { useEffect, useRef } from "react";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, time: number | null) {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if(time !== null) {
      const id = window.setInterval(tick, time);
      return () => clearInterval(id);
    }
  }, [time]);
}
