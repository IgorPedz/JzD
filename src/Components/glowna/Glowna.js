import React, { useState, useEffect } from 'react';
import "./glowna.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faUser } from '@fortawesome/free-solid-svg-icons';
function Glowna() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [gameName, setGameName] = useState('');
  const [selectedPool, setSelectedPool] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Połączenie z WebSocket
  useEffect(() => {
    const socketConnection = new WebSocket('ws://localhost:3000');

    socketConnection.onopen = () => {
      console.log('Połączono z WebSocket');
      socketConnection.send(JSON.stringify({ action: 'getPools' }));
      socketConnection.send(JSON.stringify({ action: 'getGames' }));
      socketConnection.send(JSON.stringify({ action: 'getPlayers' }));
      socketConnection.send(JSON.stringify({ action: 'getQuestions' }));
    };

    socketConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Dane od WebSocket:', data);
      if (data.action === 'showPools') {
        setPools(data.pools);
        setLoading(false);
      } else if (data.action === 'showGames'){
        setGames(data.games)
      } else if (data.action === 'playersList') {
        setPlayers(data.data);  // Ustawiamy graczy w stanie
        setLoading(false);  // Zakończenie ładowania
      } else if( data.action === 'showQuestions'){
        setQuestions(data.questions)
      }
    };

    socketConnection.onerror = (error) => {
      console.error('Błąd WebSocket:', error);
      setLoading(false);
    };

    socketConnection.onclose = () => {
      console.log('Połączenie WebSocket zostało zamknięte');
    };

    setSocket(socketConnection);

    return () => {
      socketConnection.close();
    };
  }, []);

  // Funkcja tworzenia gry
  const handleCreateGame = () => {
    if (!gameName || !selectedPool) {
      alert('Proszę podać nazwę gry oraz wybrać pulę.');
      return;
    }
  
    const gameData = {
      action: 'createGame',
      gameName,
      poolId: selectedPool
    };
  
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(gameData));
      console.log('Wysłano dane do WebSocket:', gameData);
    } else {
      console.error('Połączenie WebSocket nie jest aktywne.');
      return;
    }
  
    // **Lokalnie dodajemy grę do listy (opcja szybsza)**
    const newGame = { id: Date.now(), nazwa_gry: gameName, id_puli: selectedPool };
    setGames((prevGames) => [...prevGames, newGame]);
  
    // Czyścimy pola formularza
    setGameName('');
    setSelectedPool('');
  };
  

  const handleDeleteGame = (gameId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę grę?')) return;
  
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('❌ Połączenie WebSocket nie jest aktywne.');
      alert('Błąd: Brak połączenia z serwerem.');
      return;
    }
  
    // ✅ Optymistycznie usuwamy grę z UI
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
  
    // 📤 Wysyłamy żądanie do serwera
    socket.send(JSON.stringify({ action: 'deleteGame', gameId }));
  
    // 📥 Obsługa odpowiedzi serwera
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Dane od WebSocket:', data);
  
      if (data.action === 'showPools') {
          setPools(data.pools);
          setLoading(false);
      }
  
      if (data.action === 'gameDeleted') {
          setGames(prevGames => prevGames.filter(game => game.id !== data.gameId));
      }
  };
  };
  const handleOpenAdminPopup = (game) => {
    setSelectedGame(game);
  };
  
  const handleCloseAdminPopup = () => {
    setSelectedGame(null);
  };
  const handleAdjustHealth = () => {
    // Sprawdzamy, czy gracz jest wybrany
    if (selectedPlayer) {
      // Przygotowujemy dane do wysłania
      const healthData = {
        action: 'adjustHealth',
        playerId: selectedPlayer.id_uczestnika,  // Przekazujemy id gracza
      };
  
      // Jeśli WebSocket jest otwarty, wysyłamy zapytanie
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(healthData));
        console.log('Wysłano zapytanie do WebSocket:', healthData);
      }
    } else {
      alert('Proszę wybrać gracza');
    }
  };
  

  // Funkcja do aktualizacji punktów
  const handleAdjustPoints = () => {
    // Sprawdzamy, czy gracz jest wybrany
    if (selectedPlayer) {
      // Przygotowujemy dane do wysłania
      const pointsData = {
        action: 'adjustPoints',
        playerId: selectedPlayer.id_uczestnika,  // Przekazujemy id gracza
      };
  
      // Jeśli WebSocket jest otwarty, wysyłamy zapytanie
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(pointsData));
        console.log('Wysłano zapytanie do WebSocket:', pointsData);
      }
    } else {
      alert('Proszę wybrać gracza');
    }
  };
  
  if (loading) {
    return <p>Ładowanie pul pytań...</p>;
  }

  return (
    <div className='main-content'>
    <div className='game'>
        <div className='game-name'>
            <label>Podaj nazwę gry:</label>
            <input
                className='name-input'
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
        </div>
        <div className='pools'>
            <label>Wybierz pulę pytań:</label>
            <select
                className='custom-select'
                value={selectedPool}
                onChange={(e) => setSelectedPool(e.target.value)}
            >
                <option value='' disabled>Wybierz pulę</option>
                {pools.map((pool) => (
                    <option key={pool.id} value={pool.id}>{pool.nazwa}</option>
                ))}
            </select>
        </div>
        <button className='create-game' onClick={handleCreateGame}>
            Stwórz grę
        </button>
    </div>

    <div className='separator'></div>

    <div className='games-list'>
        <h2>Administruj gry</h2>
        {games.length > 0 ? (
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <span>{game.nazwa_gry}</span>
                        <span>Pula: {game.id_puli}</span>
                        <div className='game-options'>
                          <button className="delete-game" onClick={() => handleDeleteGame(game.id)}><FontAwesomeIcon icon={faTrash}/></button>
                          <button className="admin-game" onClick={() => handleOpenAdminPopup(game)}><FontAwesomeIcon icon={faUser}/></button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="no-games">Brak stworzonych gier</p>
        )}
    </div>
{selectedGame && (
  <div className="popup-overlay">
    <div className="popup">
      <div className='game-header'>
        <h2>Administracja gry: {selectedGame.nazwa_gry}</h2><p>Pula pytań:{selectedGame.id_puli}</p>
      </div>
      <button onClick={handleCloseAdminPopup} className="close-popup">X</button>

      <div className="popup-content">
        <h3>Uczestnicy gry:</h3>
        {players.length > 0 ? (
          <ul className="participants-list">
  {players.map((player) => (
    <li key={player.id_uczestnika}>
      <div className="player-info">
        <span className="player-name">{player.id_uczestnika}. {player.Imie} {player.Nazwisko}</span>
        <span className="player-class">({player.Klasa})</span>
      </div>
      <div className="player-stats">
        <div className="stat-item">
          <span className="stat-label">Życia</span>
          <span className="stat-value">{player.Życia}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Punkty</span>
          <span className="stat-value">{player.Punkty}</span>
        </div>
      </div>
    </li>
  ))}
</ul>
        ) : (
          <p>Brak uczestników</p>
        )}
      </div>
      <div className="controller">
  <label>Wybierz uczestnika:</label>
  <select
    value={selectedPlayer ? selectedPlayer.id_uczestnika : ''}
    onChange={(e) => {
      const player = players.find(p => p.id_uczestnika === parseInt(e.target.value));
      setSelectedPlayer(player);
    }}
  >
    <option value='' disabled>Wybierz uczestnika</option>
    {players.map((player) => (
      <option key={player.id_uczestnika} value={player.id_uczestnika}>
        {player.Imie} {player.Nazwisko} ({player.Klasa})
      </option>
    ))}
  </select>

  {selectedPlayer && (
    <>
        <div className='adjustments'>
          <button onClick={handleAdjustHealth}>Odejmij życie</button>
          <button onClick={handleAdjustPoints}>Dodaj punkt</button>
        </div>
    </>
  )}
</div>
    </div>
  </div>
)}

</div>

  );
}

export default Glowna;
