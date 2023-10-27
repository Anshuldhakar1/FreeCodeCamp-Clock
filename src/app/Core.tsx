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
    <div id={styles.Core} className={styles.flexCol}>

      <div className={styles.gridCenter}>
        <svg id={styles.headSVG} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <div id={styles.counterContainer}>
        <AppCounter title="Break Length" type="break" value={breakLen} isRunning={running} setter={setBreakLen} />
        <AppCounter title="Session Length" type="session" value={sessionLen} isRunning={running} setter={setSessionLen} />
      </div>

      <div>

        <label id={styles.timerLabel }>{sessionTitle}</label>

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

        <div id={styles.buttonDiv}>
          <button
            id="start_stop"

            className={styles.coolerBTN}
            onClick={() => { startStopTimer(); }}
          >
            <svg
              id={styles.playPauseSVG}
              viewBox="0 0 24 24"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button id="reset"
            className={styles.coolerBTN} onClick={() => { handleReset(); }}>
            <svg
              id={styles.resetSVG}
              fill="#000000"
              viewBox="-7.5 0 32 32"
              version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.88 13.84c-1.68-3.48-5.44-5.24-9.040-4.6l0.96-1.8c0.24-0.4 0.080-0.92-0.32-1.12-0.4-0.24-0.92-0.080-1.12 0.32l-1.96 3.64c0 0-0.44 0.72 0.24 1.040l3.64 1.96c0.12 0.080 0.28 0.12 0.4 0.12 0.28 0 0.6-0.16 0.72-0.44 0.24-0.4 0.080-0.92-0.32-1.12l-1.88-1.040c2.84-0.48 5.8 0.96 7.12 3.68 1.6 3.32 0.2 7.32-3.12 8.88-1.6 0.76-3.4 0.88-5.080 0.28s-3.040-1.8-3.8-3.4c-0.76-1.6-0.88-3.4-0.28-5.080 0.16-0.44-0.080-0.92-0.52-1.080-0.4-0.080-0.88 0.16-1.040 0.6-0.72 2.12-0.6 4.36 0.36 6.36s2.64 3.52 4.76 4.28c0.92 0.32 1.84 0.48 2.76 0.48 1.24 0 2.48-0.28 3.6-0.84 4.16-2 5.92-7 3.92-11.12z"></path>
            </svg>
          </button>
        </div>
      
      </div>

      <div id="alarm">
        <audio ref={alarmRef} src={alarm} id="beep"></audio>
      </div>

    </div>
  );
};

export default Core;
