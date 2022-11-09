import { Progress } from "@mantine/core";
import { useEffect, useState } from "react";

export function ProgressTimer({ start, time, ...props }) {

  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    setStartTimer(false);

    let timeout = null;
    if(start) setTimeout(() => {
      timeout = setStartTimer(true)
    }, 50);

    return () => clearTimeout(timeout);
  }, [start]);

  return (
    <Progress
      {...props}
      value={startTimer ? 100 : 0}
      sx={{
        '& [role=progressbar]': {
          transition: `width ${startTimer ? time : '0'}ms linear`,
        }
      }}
    />
  )
}
