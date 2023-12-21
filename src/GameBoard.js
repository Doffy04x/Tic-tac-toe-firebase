import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, set, push } from 'firebase/database';
import './pvp.css';

const TicTacToe = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState(Array(9).fill(null));
  const [role, setRole] = useState('👨🏻‍🦱');
  const [winner, setWinner] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handlePlaceSelection = async (index) => {
    if (!user) {
      alert("Please log in to play the game.");
      return;
    }

    const updatedCases = cases.slice();
    updatedCases[index] = role;
    setCases(updatedCases);

    const gameWinner = calculateWinner(updatedCases);
    if (gameWinner) {
      setWinner(role);
      await saveGameResult(updatedCases, role);
    } else if (updatedCases.every((square) => square !== null)) {
      setWinner('Tie');
      await saveGameResult(updatedCases, 'Tie');
    } else {
      setRole(role === '👨🏻‍🦱' ? '👨🏿' : '👨🏻‍🦱');
    }
  };

const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const saveGameResult = async (finalBoard, winner) => {
    if (!user) return;

    try {
      const newGameRef = push(ref(database, 'games'));
      await set(newGameRef, {
        userId: user.uid,
        board: finalBoard,
        winner: winner,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error("Error saving game result: ", error);
    }
  };

  const resetGame = () => {
    setCases(Array(9).fill(null));
    setRole('👨🏻‍🦱');
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handlePlaceSelection(index)}>
        {cases[index]}
      </button>
    );
  };

  return (
    <div className="tictactoe-container">
      <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
      <h2 className="game-title">Tic Tac Toe</h2>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      {winner && <p>{winner === 'Tie' ? 'It\'s a Tie!' : `Winner: ${winner}`}</p>}
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
