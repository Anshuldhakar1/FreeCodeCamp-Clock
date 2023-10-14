import { useEffect, useState } from 'react';
import styles from './app.module.scss';

import AppCounter from './AppCounter';

export const Main = () => { 

  const [initMins, setInitmins] = useState(25);
  const [time, setTime] = useState({mins:initMins,secs:0});
  const [breakLen, setBreakLen] = useState(5);
  const [sessionLen, setSessionLen] = useState(25);
  const [running, setRunning] = useState(false);
  
  const [sessionTitle, setSessionTitle] = useState("Session");

  let interval:NodeJS.Timer | undefined = undefined;

  useEffect(() => { 
    if (running) startTimer();
    else if (interval) clearInterval(interval);

    return () => { 
      clearInterval(interval);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => { 
    updateSessionLen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLen]);
  

  function updateSessionLen() {
    if (sessionTitle === "Session") {
      setInitmins(sessionLen);
      setTime({ mins: sessionLen, secs: 0 });
    }
  }

  function startTimer() {
    interval = setInterval(() => {
      setTime((prevTime) => {
        
        let s = prevTime.secs;
        let m = prevTime.mins;

        s--;
        if (s < 0) {
          s = 59; m--;
        }

        if (m < 0) {
          setRunning(false);
          if (sessionTitle === "Session") { 
            setSessionTitle("Break");
            setTime({ mins: breakLen, secs: 0 });
          }
          if (sessionTitle === "Break") {
            setSessionTitle("Session");
            setTime({ mins: sessionLen, secs: 0 });
          }
          setTimeout(() => { 
            setRunning(true);
          },10);
        }

        return { mins: m, secs: s };
      });
    }, 1000);
  }  
  
  function twoDigits(num:number): string {
    return (num < 10 && num >= 0 ? "0" : "") + num;
  }

  function handleReset() {
    setSessionTitle("Session");
    setRunning(false);
    setInitmins(25);
    setTime({ mins: 25, secs: 0 });
    setSessionLen(25);
    setBreakLen(5);
  }

  return (

    <div className={styles.flexCol}>

      <div style={{display: "flex"}}>
        <AppCounter title="Break Length" type="break" value={breakLen} isRunning={running} setter={setBreakLen} />
        <AppCounter title="Session Length" type="session" value={sessionLen} isRunning={running} setter={setSessionLen} />
      </div>

      <div>
        <label id="timer-label">{sessionTitle}</label>
        <div id="time-left">{twoDigits(time.mins)}:{twoDigits(time.secs)}</div>
        <button id="start_stop" onClick={() => { setRunning(!running); } }>Play/Pause</button>
        <button id="reset" onClick={() => { handleReset(); }}>Reset</button>
      </div> 

    </div>
  );
};

export default Main;