import { AnimatedNumber } from './components';
import { useCountdownTime } from './hooks';

interface CountdownTimerProps {
  exp: number;
}

export default function CountdownTimer({ exp }: CountdownTimerProps) {
  const { mins, secs, formatNumber, prevTime, isLoading } = useCountdownTime({ exp });

  const minValue = isLoading ? "--" : formatNumber(mins);
  const secValue = isLoading ? "--" : formatNumber(secs);

  return (
    <div className="flex items-center justify-center gap-4 p-6">
      <AnimatedNumber
        value={minValue}
        label="min"
        prevValue={isLoading ? undefined : formatNumber(prevTime.minutes % 60)}
        isLoading={isLoading}
      />
      <AnimatedNumber
        value={secValue}
        label="sec"
        prevValue={isLoading ? undefined : formatNumber(prevTime.seconds)}
        isLoading={isLoading}
      />
    </div>
  );
}
