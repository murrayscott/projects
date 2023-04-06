import React, { useState, useEffect } from "react";
import PlayerCard from "../Components/PlayerCard";
import ComputerCard from "../Components/ComputerCard";
import { getDinosaurs } from "../Services/GameService";
import ReactAudioPlayer from "react-audio-player";
import "./GameContainer.css";
import "./AudioControl.css";


const GameContainer = ({ playerName }) => {

    const [player, setPlayer] = useState([]);
    const [cpu, setCPU] = useState([]);
    const [middle, setMiddle] = useState([]);
    const [result, setResult] = useState(null);
    const [gameUpdate, setGameUpdate] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [cpuCardVisible, setCpuCardVisible] = useState(false);
    const [flipActive, SetFlipActive] = useState(false)


    const shuffle = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    };


    //handleCardFlip

    const handleCardFlip = () => {
        SetFlipActive(!flipActive);

    }

    // add exisiting index 0 cards to middle deck  
    const middleDeck = () => {
        console.log(middle.len)
        const mid = [...middle];
        console.log(mid.len)
        mid.push(player[0]);
        mid.push(cpu[0]);
        console.log(mid.len)
        setMiddle(mid);
    };

    const playerWin = () => {
        handleCardFlip()
        setTimeout(() => {
            const newPlayer = [...player];
            const playerWin = newPlayer.concat(middle);
            playerWin.shift();  // remove index [0] of playerhand
            const newCPU = [...cpu];
            newCPU.shift(); // remove index [0] of cpuhand
            setPlayer(playerWin);
            setCPU(newCPU);
            setMiddle([]);
        }, 800);
    };

    const cpuWin = () => {
        handleCardFlip()
        setTimeout(() => {

            const newCPU = [...cpu];
            const cpuWin = newCPU.concat(middle);
            cpuWin.shift(); // remove index [0] of cpuhand
            const newPlayer = [...player];
            newPlayer.shift(); // remove index [0] of playerhand
            setCPU(cpuWin);
            setPlayer(newPlayer);
            setMiddle([]);
        }, 800);

    };

    const draw = () => {
        handleCardFlip()
        setTimeout(() => {

            const newCPU = [...cpu];
            newCPU.shift();
            setCPU(newCPU);
            const newPlayer = [...player];
            newPlayer.shift();
            setPlayer(newPlayer);
        }, 800);

    }

    //resolve game function
    const resolveGame = (result) => {
        if (result === 'player') {
            setResultMessage('Player wins!!');
            playerWin();
        } else if (result === 'cpu') {
            setResultMessage('CPU wins!!!');
            cpuWin();
        } else if (result === 'draw') {
            setResultMessage('Draw');
            draw();
        }
        setResult('')

    }

    //Comparison function
    const compareAttribute = (attribute) => {
        middleDeck();
        const key = (attribute);
        if (player[0][key] > cpu[0][key]) {
            setResult('player')
            setGameUpdate(!gameUpdate)
        } else if (cpu[0][key] > player[0][key]) {
            setResult('cpu')
            setGameUpdate(!gameUpdate)
        } else {
            setResult('draw')
            setGameUpdate(!gameUpdate)
        }
        setCpuCardVisible(true);
    };

    //initial fectch request
    useEffect(() => {
        getDinosaurs()
            .then((data) => {
                const playerHand = data;
                shuffle(playerHand);
                const cpuHand = playerHand.splice(0, 15);
                setPlayer(playerHand);
                setCPU(cpuHand);
            });
    }, []);

    // execute game functionality once result and game update have been set in compare function 
    useEffect(() => {
        resolveGame(result);
    }, [gameUpdate]);

    if (!player.length || !cpu.length) return null;


    // // limits audio volume to 20%
    // // works if page loaded then code applied - breaks app if refreshed

    // const audio = document.getElementById("theme-audio")
    // function setVolume(){
    //     audio.volume = 0.2
    //     }
    // setVolume()

    return (
        <>
            <div className="audio-container">
                <ReactAudioPlayer src={require("../Audio/Jurassic_Park_Theme_Song.mp3")} controls volume={0.05} controlsList="nodownload noplaybackrate" loop />
            </div>
            <div className="cards-display">
                <div className="player-card">
                    <div className="player-name">
                        <p>{playerName}</p>
                    </div>
                    <PlayerCard player={player} compareAttribute={compareAttribute} handleCardFlip={handleCardFlip} />
                    <div className="cards-remaining">
                        <p>{player.length} cards remaining</p>
                    </div>
                </div>
                <div className="middle-panel">
                    <div className="draw-pile">
                        <p>DRAW PILE: {middle.length}</p>
                    </div>
                </div>
                <div className="cpu-card">
                    <div className="player-name">
                        <p>Computer</p>
                    </div>
                    <ComputerCard cpu={cpu} flipActive={flipActive} />
                    <div className="cards-remaining">
                        <p>{cpu.length} cards remaining</p>
                    </div>
                </div>
            </div>
        </>
    );




};



export default GameContainer; 