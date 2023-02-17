import React, {useState, useEffect} from 'react'
import {cz} from "./language_cz"
import {en} from "./language_en"
import playerImageSrc from "./images/player.png"
import enemyImageSrc from "./images/enemy.png"
import killImageSrc from "./images/kill.png"
import "./basic.css"

const playerImage = <img src={playerImageSrc} alt="player" />
const enemyImage = <img src={enemyImageSrc} alt="enemy" />
const killImage = <img src={killImageSrc} alt="enemy" />


// Language module //

let language
let languageSwitch = "en"
    if (languageSwitch === "cz") {
        language = cz
    } else {
        language = en
    }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Main function ///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RockScissorsPaperGame = () => {
  const stance = [language.stance.aggressive, language.stance.sneaky, language.stance.defensive]
  const [playerChoose, setPlayerChoose] = useState(-1)
  const [computerChoose, setComputerChoose] = useState(Math.floor(Math.random() * stance.length))
  const [computerStep, setComputerStep] = useState(0)
  const [computerHealth, setComputerHealth] = useState(2)
  const [winnerStatus, setWinnerStatus] = useState('')
  const [winner, setWinner] = useState('')
  const [endGame, setEndGame] = useState(false)
  const [endRound, setEndRound] = useState(false)
  const [result, setResult] = useState()
  const [battleField] = useState([enemyImage, "", "", playerImage])
    let playerStance = (stance[playerChoose])
    let computerStance = (stance[computerChoose])


  if (endGame === false) {
    if (playerChoose !== -1) {
      if (stance.indexOf(playerStance) === stance.indexOf(computerStance)) {
        setWinnerStatus("draw")
        setComputerHealth(computerHealth + 1)
        setPlayerChoose(-1)
        setResult(`${language.computerChoose[0]} ${computerStance} ${language.computerChoose[1]} ${playerStance} ${language.roundResult.draw}!`)
      } 
      else if (stance.indexOf(playerStance) === stance.indexOf(computerStance)-1 || 
                (stance.indexOf(playerStance) === stance.indexOf(computerStance)+2)) {
        setWinnerStatus("player")
        setComputerHealth(computerHealth - 1)
        setPlayerChoose(-1)
        setResult(`${language.computerChoose[0]} ${computerStance} ${language.computerChoose[1]} ${playerStance} ${language.roundResult.win}!`)

      } else if (stance.indexOf(playerStance) === stance.indexOf(computerStance)+1 || 
                (stance.indexOf(playerStance) === stance.indexOf(computerStance)-2)) {
        setWinnerStatus("computer")
        setPlayerChoose(-1)
        setResult(`${language.computerChoose[0]} ${computerStance} ${language.computerChoose[1]} ${playerStance} ${language.roundResult.lose}!`)

      }
      setComputerChoose(Math.floor(Math.random() * stance.length))
      setEndRound(true)
    }

    if (computerHealth === 0 ) {
      setEndGame(true)
      battleField[computerStep] = killImage
      setWinner(language.endGameWin)
    }
  }

  useEffect(()=>{
    if (winnerStatus === "computer") {
      battleField[computerStep] = ""
      battleField[computerStep +1] = enemyImage
      setComputerStep(computerStep +1)
      setWinnerStatus('')

      if (!battleField.includes(playerImage)) {
        setEndGame(true)
        setWinner(language.endGameLose)
      }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerStatus]);


  return (
    <div className='main'>
    <h1>{language.title}</h1>
    <form><input className='left' type={"submit"} value={language.reset}></input></form>

    { endGame ? 
      <h2 className='endGame'>{winner}</h2>
    : 
    <>
      <label>{language.moveLabel}</label>
      <div className='buttons'>
        {stance.map((item, index) =>
          <button key={index} value={index} onClick={e => setPlayerChoose(e.target.value)}>{item}</button>
        )}
      </div>
    </>
    }

      { endRound ?
        <h2>{result}</h2>
      :
        ""
      }
      
      <table className='battlefield'>
        <tbody>
          <tr>
            <th>{language.enemyHealth}: {computerHealth}</th>
          </tr>
          <tr>
          {battleField.map((item, index) =>
            <td key={index}>{item}</td>
          )}
          </tr>
        </tbody>
      </table>

      <table className='hints'>
        <thead>
          <tr>
            <th>{language.tableWin}</th>
            <th>{language.tableLose}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{language.stance.aggressive}</td>
            <td>{language.stance.sneaky}</td>
          </tr>
          <tr>
            <td>{language.stance.sneaky}</td>
            <td>{language.stance.defensive}</td>
          </tr>
          <tr>
            <td>{language.stance.defensive}</td>
            <td>{language.stance.aggressive}</td>
          </tr>
        </tbody>
      </table> 
    </div>
  )
}