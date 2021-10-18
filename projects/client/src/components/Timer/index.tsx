import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Span } from 'components/dom/Span';

export type TTimerProps = {
  duration: number;
  repeat?: boolean;
  cb?: () => void;
};

export const Wrapper = styled(Span)``;

export const Timer = ({ duration, cb, repeat }: TTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft < 0) {
      if (repeat) {
        setTimeLeft(duration);
      }

      if (cb) {
        cb();
      }
    } else {
      const timeoutId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [timeLeft, duration, repeat, cb]);

  return <Wrapper>{timeLeft}</Wrapper>;
};
