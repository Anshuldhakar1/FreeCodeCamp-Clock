/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import styles from './app.module.scss';

import alarm from '../assets/alarm.wav';

import AppCounter from './AppCounter';

export const Core = () => {

  const [breakLen, setBreakLen] = useState(5);
  const [sessionLen, setSessionLen] = useState(1);
  const [time, setTime] = useState({ mins: sessionLen, secs: 0 });
  const [running, setRunning] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("Session");

  const alarmRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = alarmRef.current;
    if (audio) {
      audio.addEventListener("ended", () => {
        audio.currentTime = 0;
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => {
          audio.currentTime = 0;
        });
      }
    };
  }, []);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        if (time.mins === 0 && time.secs === 0) {
          
          const audio = alarmRef.current;

          if (audio) {
            audio.play();
            setTimeout(() => {
              audio.pause();
              audio.currentTime = 0;
            }, 2000);
          }

          setSessionTitle((prevTitle) => { 
            return prevTitle === "Session" ? "Break" : "Session";
          });

          setTime(() => { 
            return { mins: sessionTitle === "Session" ? breakLen : sessionLen, secs: 0 }
          });

        } else if (time.secs === 0) {
          setTime({ mins: time.mins - 1, secs: 59 });
        } else {
          setTime({ mins: time.mins, secs: time.secs - 1 });
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [running, time, sessionTitle, breakLen]);

  useEffect(() => {
    if (!running) setTime({ mins: sessionLen, secs: 0 });
  }, [sessionLen]);

  function twoDigits(num: number): string {
    return (num < 10 && num >= 0 ? "0" : "") + num;
  }

  function handleReset() {
    setBreakLen(() => { return 5 });
    setSessionLen(() => { return 1 });
    setTime(() => { return { mins: sessionLen, secs: 0 } });
    setRunning(() => { return false });
    setSessionTitle(() => { return "Session" });
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  }

  function startStopTimer() {
    setRunning(!running);
  }

  return (
    <div id="Core" className={styles.flexCol}>

      <div style={{ display: "flex" }}>
        <AppCounter title="Break Length" type="break" value={breakLen} isRunning={running} setter={setBreakLen} />
        <AppCounter title="Session Length" type="session" value={sessionLen} isRunning={running} setter={setSessionLen} />
      </div>

      <div>

        <label id="timer-label">{sessionTitle}</label>

        <div id={styles.AnimatedsvgContainer} className={styles.gridCenter}>
          <div id={styles.timeLeft}>
            {twoDigits(time.mins)}:{twoDigits(time.secs)}
          </div>
          <svg className={styles.animatedSvg} viewBox = "0 0 100 100">
            <circle
              className={styles.animatedSvgCircle + " " + styles.animatedSvgCircleBG}
              cx="50" cy="50" r="40"
            />
            <circle
              
              className={styles.animatedSvgCircle + " " + styles.animatedSvgCircleMeter}
              cx="50" cy="50" r="40"
            />
          </svg>
        </div>

        <button id="start_stop" onClick={() => { startStopTimer(); }}>Play/Pause</button>
        <button id="reset" onClick={() => { handleReset(); }}>Reset</button>
      
      </div>

      <div id="alarm">
        <audio ref={alarmRef} src={alarm} id="beep"></audio>
      </div>

    </div>
  );
};

export default Core;
