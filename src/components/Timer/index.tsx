import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DEFAULT_TIMER } from '../../constants';
import {
  decrement,
  reset,
  selectTimerValue,
  setTimer,
} from '../../features/timer/timerSlice';
import Button from '../Button';
import TextInput from '../TextInput';
import './index.scss';

import { useEffect, useRef, useState } from 'react';

const Timer = () => {
  const timer = useAppSelector(selectTimerValue);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>(DEFAULT_TIMER.toString());
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    const startTimer = () => {
      intervalId.current = setInterval(() => {
        dispatch(decrement());
      }, 1000);
    };

    if (isRunning) {
      startTimer();
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [isRunning, value]);

  useEffect(() => {
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) return;
    dispatch(setTimer(Number(value)));
  }, [value]);

  const toggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    dispatch(reset());
    setIsRunning(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const renderedTimer = `${Math.floor(timer / 3600)}h ${Math.floor(
    (timer % 3600) / 60,
  )}m ${timer % 60}s`;

  return (
    <div className="daytwo">
      <div className="App">
        <h1 className="timer">{renderedTimer}</h1>
        <div className="actions">
          <Button
            className="btn btn--primary"
            onClick={toggle}
            text={isRunning ? 'Stop' : 'Start'}
          />
          <TextInput
            value={value}
            onChange={handleInputChange}
            placeholder="Enter seconds"
          />

          <Button className="btn btn--danger" onClick={handleReset} text="Reset" />
        </div>
      </div>
    </div>
  );
};

export default Timer;
