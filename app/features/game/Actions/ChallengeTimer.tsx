import { useEffect, useState } from "react";

type ChallengeTimerProps = {
  duration?: number;
  onTimeout: () => void;
};

export default function ChallengeTimer({
  duration = 30,
  onTimeout,
}: ChallengeTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const timeoutId = window.setTimeout(() => {
      onTimeout();
    }, duration * 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [duration, onTimeout]);

  return <span>{timeLeft}</span>;
}
