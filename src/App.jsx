import { useEffect, useRef, useState } from 'react'
import './App.css'
import Game from './models/Game'
import Card from './components/Card/Card';
import BackCard from './components/BackCard/BackCard';
import WonElement from './components/WonElement/WonElement';

function App() {
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [selectedComputerCard, setSelectedComputerCard] = useState(null);
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);
  const [isWinner, setIsWinner] = useState(null)
  
  const gameRef = useRef(null);
  if (!gameRef.current) gameRef.current = new Game();
  const game = gameRef.current;

  useEffect(() => {
    syncFromGame();
  }, []);
  
  const groupedWonRoundsComputer = game.getWonRoundsComputer().reduce((acc, item) => {
    if (!acc[item.element]) {
      acc[item.element] = [];
      console.log(acc);
    }
    acc[item.element].push(item);
    console.log(acc);
    return acc;
  }, {});

  const groupedWonRoundsPlayer = game.getWonRoundsPlayer().reduce((acc, item) => {
    if (!acc[item.element]) {
      acc[item.element] = [];
    }
    acc[item.element].push(item);
    return acc;
  }, {});

  function syncFromGame() {
    setPlayerCards([...game.getPlayerHandDeck()]);
    setComputerCards([...game.getComputerHandDeck()]);
    setSelectedComputerCard(game.getSelectedComputerCard());
    setSelectedPlayerCard(game.getSelectedPlayerCard());
  }

  function handlePlay(card) {
    setIsBattleInProgress(true)
    game.pickPlayerCardFromPlayerHandDeck(card);
    let computerCard = game.pickRandomCardFromComputerHandDeck();
    syncFromGame();
    setTimeout(() => {
      game.battleCards(card, computerCard)
      game.checkForWinner()
      setSelectedComputerCard(null);
      setSelectedPlayerCard(null);
      setIsBattleInProgress(false);
    }, 3000);
  }

  return (
    <div className='game'>
      <div className='winning-display'>
        <div className='winning-badges left'>
          {Object.entries(groupedWonRoundsComputer).map(([_, list], index) => (
              <div className='badge-col' key={index}>
                {list.length >0 && list.map((item, index) => (
                  <div className="badge-item" style={{top: `${index * 30}px`}} key={index}>
                    <WonElement element={item.element} color={item.color}/>
                  </div>
                ))}
              </div>
            
          ))}
        </div>
        <div className='winning-badges right'>
          {Object.entries(groupedWonRoundsPlayer).map(([_, list], index) => (
              <div className='badge-col' key={index}>
                {list.length >0 && list.map((item, index) => (
                  <div className="badge-item" style={{top: `${index * 30}px`}} key={index}>
                    <WonElement element={item.element} color={item.color}/>
                  </div>
                ))}
              </div>
            
          ))}
        </div>
      </div>

      <div className='cards-battle'>
        {selectedComputerCard && (<Card card={selectedComputerCard} disabled={true} isShow={true}/>)}
        {selectedPlayerCard && (<Card card={selectedPlayerCard} disabled={true} isShow={true}/>)}
      </div>
      
      <div className="bottom">
        <div className="timer">
          <span>20</span>
        </div>
        <div className='cards-wrapper'>
          <div className='cards left'>
            {computerCards.length > 0 && computerCards.map((card) => (
              <BackCard key={card.id}/>
            ))}
          </div>
          <div className='cards right'>
            {playerCards.length > 0 && playerCards.map((card) => (
              <Card key={card.id} card={card} onSelect={() => handlePlay(card)} disabled={isBattleInProgress}/>
            ))}
          </div>
        </div>     
      </div>
    </div>
  )
}

export default App
