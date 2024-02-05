import './index.scss';

import { useEffect, useRef, useState } from 'react';

import Button from '../Button';
import TextInput from '../TextInput';

const INITIAL_TIMER = 60;

const Timer = () => {
  const [timer, setTimer] = useState<number>(INITIAL_TIMER);
  const [value, setValue] = useState<string>(INITIAL_TIMER.toString());
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    const startTimer = () => {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
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
  }, [isRunning]);

  useEffect(() => {
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) return;
    setTimer(Number(value));
  }, [value]);

  const toggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimer(INITIAL_TIMER);
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