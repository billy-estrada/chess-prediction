import { useEffect, useState } from 'react';
import Chessground from "@react-chess/chessground";
import { Chess } from 'chess.js';

import "../node_modules/chessground/assets/chessground.base.css";
import "../node_modules/chessground/assets/chessground.brown.css";
import "../node_modules/chessground/assets/chessground.cburnett.css";

import './App.css'

function App() {
  const [fen, setFen] = useState('start');
  const [chess] = useState(new Chess());

  useEffect(() => {
    if (!chess.isGameOver()) {
      const interval = setInterval(() => {
        const moves = chess.moves();
        if (moves.length === 0) {
          clearInterval(interval);
          return;
        }
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
        setFen(chess.fen());
      }, 1000); // move every second

      return () => clearInterval(interval);
    }
  }, [chess]);
  

  return (
    <>
      <div>
       <Chessground
        config={{
          fen,
          viewOnly: false,
          animation: { enabled: true }
        }}
      />
      </div>
    </>
  )
}

export default App
