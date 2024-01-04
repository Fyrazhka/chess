import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from "./models/Player";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [board,setBoard]=useState(new Board())
    const [whitePlayer,setWhitePalayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer,setBlackPalayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer,setCurrentPlayer] = useState<Player | null >(whitePlayer)
    useEffect(()=>{
        restart()
    },[])
    function swapPlayer(){
        setCurrentPlayer(currentPlayer === whitePlayer? blackPlayer : whitePlayer)
    }

    function restart(){
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }
  return (
    <div className="App">
        <Timer
            restart={restart}
            currentPlayer={currentPlayer}
        />
        <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
        />
        <div>
            <LostFigures
                title="Lost Black Figures"
                figures={board.lostBlackFigures}
            />
            <LostFigures
                title="Lost White Figures"
                figures={board.lostWhiteFigures}
            />
        </div>
    </div>
  );
}

export default App;
