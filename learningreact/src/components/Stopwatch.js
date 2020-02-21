import React, { Component, useState, useEffect, useContext, useRef } from 'react'
import toDoStyle from '../styles/toDo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import  MyContext  from './AppContext';

const timerIcon = <FontAwesomeIcon icon= {faClock} size= '1x' />

let intervalId = 0;
let timeBeforeStop = '';
let waitingToResume = [];
let resume = false;
function Timer ({setS, timerName}) { 
    const value = useContext(MyContext);
    const timersStartingTime = value.timersStartingTime;

    let currTime = (stopTime) => {
      let curTime = 0,
          s = 0,
          m = 0,
          h = 0,
          d = 0
      if (timersStartingTime.length > 0) {
        for (let t of timersStartingTime) {
          if (t[0] === timerName) {
            if (stopTime && stopTime > 0) {
              waitingToResume.push(t[0], stopTime);
              waitingToResume = waitingToResume.filter((item, pos, ar) => ar.indexOf(item) === pos);
              console.log(t[1], ' t[1]');
              let totalSec =  Math.round((stopTime - t[1]) / 1000);
              s = totalSec % 60;
              m = Math.floor(totalSec / 60);
              h = Math.floor(m / 60);
              d = Math.floor(d / 24);
              curTime = `${d}d:${h}h:${m}m:${s}`
              console.log(stopTime, 'stTIME')
              console.log(totalSec, 'dividedStTime')
              return curTime;
            }
            
            if (resume) {
              if (waitingToResume.includes(t[0])) {
              t[1] = waitingToResume[1];
              
              waitingToResume.splice(waitingToResume.indexOf(t[0]),2);
            }
            }
            
            let totalSeconds = Math.round((Date.now() - t[1]) / 1000);
            s = totalSeconds % 60;
            m = Math.floor(totalSeconds / 60);
            h = Math.floor(m / 60);
            d = Math.floor(d / 24);
            curTime = `${d}d:${h}h:${m}m:${s}`
            return curTime
          }
        }
      }
      
    }
  
   useEffect(() => {
      startTimer(resume);
    return () => {
      console.log('willunmount');
      clearTimer();   
    }
  },[]);
  
  
  function addTime() {
    setS(currTime());
  }

  function startTimer(ctn) {
    let shoudResume = ctn;
    if (shoudResume) {
      timeBeforeStop = '';
    }
  
    intervalId = setInterval(() => addTime(), 1000);
  }

  function stopTimer(stop)  {
    timeBeforeStop = stop;
    resume = false;
  }
  
  function clearTimer() {
    clearInterval(intervalId);
    intervalId = 0;
  }

  function resumeTimer() {
    resume = true;
    startTimer(resume);
  }
  
//console.log('sec:' ,s[activeCategory])
return (
  <>
  
  <button onClick = {() => stopTimer(Date.now())}>stop</button>
  <button onClick = {() => resumeTimer()}>resume</button>
  {console.log('stopTime:',timeBeforeStop)}
  {console.log('iId:',intervalId)}
  {console.log('waitingToResume:',waitingToResume)}
  {currTime(timeBeforeStop)};
  </>
)

// var time = [s,m,h,d];
// return(
//     <div>
//         <span title= "Toggle" style={{cursor: 'pointer'}} onClick={toggle}>{timerIcon}</span>
//         {d}d:{h < 10 ? '0' + h : h}h:{m < 10 ? '0' + m : m}m:{s < 10 ? '0' + s : s}s
//         {console.log('SWATCH reRENDERED:')}
//         {console.log('actCats:',actCats)}
//     </div>

    
// )

 }
export default Timer

