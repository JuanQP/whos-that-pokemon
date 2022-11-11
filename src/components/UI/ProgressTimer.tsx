import { Progress, ProgressProps } from "@mantine/core";
import { useEffect, useState } from "react";

interface Props extends ProgressProps {
  start: boolean;
  time: number;
}

export function ProgressTimer({ start, time, ...props }: Props) {

  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    setStartTimer(false);

    let timeout = 0;
    if(start) {
      timeout = window.setTimeout(() => {
        setStartTimer(true)
      }, 50);
    }

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
