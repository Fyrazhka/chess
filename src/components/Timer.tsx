import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps{
    currentPlayer:Player | null;
    restart:()=>void;
}
const Timer:FC<TimerProps> = ({currentPlayer,restart}) => {
    const [time,setTime] = useState(60)
    const [blackTime,setBlackTime] =useState(time)
    const [whiteTime,setWhiteTime] =useState(time)
    const timer=useRef<null | ReturnType<typeof setInterval>>(null)
    const [bool,setBool]=useState(true)
    useEffect(() => {
        if(!bool)
            startTimer()
        setBool(false)
    }, [currentPlayer]);

    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback=currentPlayer?.color===Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current=setInterval(callback, 1000)

    }
    function decrementWhiteTimer() {
        setWhiteTime(prevWhiteTime => {
            if (prevWhiteTime === 0) {
                alert("Black WIN");
                handlerRestart();
            }
            return prevWhiteTime - 1;
        });

    }

    function decrementBlackTimer() {

        setBlackTime(prevBlackTime => {
            if (prevBlackTime === 0) {
                alert("White WIN");
                handlerRestart();
            }
            return prevBlackTime - 1;
        });


    }
    const handlerRestart=()=>{
        setWhiteTime(time)
        setBlackTime(time)
        restart()
        startTimer()
    }
    const setAllTime=()=>{
        setTime(Number(prompt("Enter time for game")))
    }
    return (
        <div>
            <div>
                <button onClick={handlerRestart}>Start game</button>
                <button onClick={setAllTime}>Set time</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;