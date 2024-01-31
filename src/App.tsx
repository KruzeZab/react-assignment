import './App.css';

import { useEffect, useRef, useState } from 'react';

const initialTimer = 60;

const App = () => {
  const [timer, setTimer] = useState<number>(initialTimer);
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
      clearInterval(intervalId.current as number);
    }

    return () => {
      clearInterval(intervalId.current as number);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimer(initialTimer);
    setIsRunning(false);
  };

  const renderedTimer = `${Math.floor(timer / 3600)}h ${Math.floor(
    (timer % 3600) / 60,
  )}m ${timer % 60}s`;

  return (
    <div className="App">
      <h1 className="timer">{renderedTimer}</h1>
      <div className="btn-wrapper">
        <button className="btn" onClick={handleStart}>
          Start
        </button>
        <button className="btn" onClick={handleStop}>
          Stop
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
