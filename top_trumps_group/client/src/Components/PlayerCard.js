import React from "react";
import "./Cards.css";
import ReactAudioPlayer from "react-audio-player";


const PlayerCard = ({ player, compareAttribute,handleCardFlip }) => {

    const selectedCard = player[0];
    const length = player.length;

    const handleClick = (e) => {
        handleCardFlip()
        setTimeout(()=>(compareAttribute(e.target.id)),3000)
    };

    return (
        <>
            {length > 0 ?
                <div className="card-border">
                    <div className="card-front">
                        <div className="card-image">
                            <img src={require("../Images/" + selectedCard.image)} alt=""
                                height="200" width="380" class="center" style={{ objectFit: "contain" }} />
                        </div>
                        <p className="dino-name">
                            {selectedCard.name}{selectedCard.diet == "Herbivore" ? " 🥬" : " 🥩"}
                        </p>
                    
                        <p className="dino-info">{selectedCard.description}</p>
                        <p className="dino-weight" id="weight" onClick={handleClick}>Weight:  {selectedCard.weight.toLocaleString()} lbs</p>
                        <p className="dino-height" id="height" onClick={handleClick}>Height:  {selectedCard.height} ft</p>
                        <p className="dino-length" id="length" onClick={handleClick}>Length:  {selectedCard.length} ft</p>
                        <p className="dino-age" id="age" onClick={handleClick}>Age:  {selectedCard.age} million years</p>
                        <p className="dino-intelligence" id="intelligence" onClick={handleClick}>Intelligence:  {selectedCard.intelligence}</p>
                        <p className="dino-danger" id="danger_rating" onClick={handleClick}>Danger rating:  {selectedCard.danger_rating}</p>
                        <div className="playerAudio">
                        <ReactAudioPlayer src={require("../Audio/" + selectedCard.sound)} controls volume={0.4} controlsList="nodownload noplaybackrate"/>
                        </div>
                    </div>

                </div>
                :
                <>
                    null
                </>
            }
        </>
    );
};

export default PlayerCard;
