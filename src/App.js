import React, {useState, useEffect} from 'react'
import {cz} from "./language_cz"
import {en} from "./language_en"
import "./basic.css"

let language
let languageSwitch = "en"
    if (languageSwitch === "cz") {
        language = cz
    } else {
        language = en
    }


export const StoneScissorsPaperGame = () => {
  const stance = [language.stance.aggressive, language.stance.sneaky, language.stance.defensive]
  const [playerChoose, setPlayerChoose] = useState(-1)
  const [computerChoose, setComputerChoose] = useState(Math.floor(Math.random() * stance.length))
  const [computerStep, setComputerStep] = useState(0)
  const [computerHealth, setComputerHealth] = useState(2)
  const [winnerStatus, setWinnerStatus] = useState('')
  const [winner, setWinner] = useState('')
  const [endGame, setEndGame] = useState(false)
  const [battleField] = useState(["C", "", "", "P"])
    let playerStance = (stance[playerChoose])
    let computerStance = (stance[computerChoose])


  if (endGame === false) {
    if (playerChoose !== -1) {
      if (stance.indexOf(playerStance) === stance.indexOf(computerStance)) {
        setWinnerStatus("draw")
        setComputerHealth(computerHealth + 1)
        setPlayerChoose(-1)
      } 
      else if (stance.indexOf(playerStance) === stance.indexOf(computerStance)-1 || 
                (stance.indexOf(playerStance) === stance.indexOf(computerStance)+2)) {
        setWinnerStatus("player")
        setComputerHealth(computerHealth - 1)
        setPlayerChoose(-1)
      } else if (stance.indexOf(playerStance) === stance.indexOf(computerStance)+1 || 
                (stance.indexOf(playerStance) === stance.indexOf(computerStance)-2)) {
        setWinnerStatus("computer")
        setPlayerChoose(-1)
      }
    }

    if (computerHealth === 0 ) {
      setEndGame(true)
      setWinner("Player")
    }
  }

  useEffect(()=>{
    if (winnerStatus === "computer") {
      battleField[computerStep] = ""
      battleField[computerStep +1] = "C"
      setComputerStep(computerStep +1)
      setComputerChoose(Math.floor(Math.random() * stance.length))
      setWinnerStatus('')

      if (!battleField.includes('P')) {
        setEndGame(true)
        setWinner("Computer")
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerStatus]);
 


  return (
    <>
    <h1>{language.title}</h1>

    <label>{language.moveLabel}</label>
      {stance.map((item, index) =>
        <button key={index} value={index} onClick={e => setPlayerChoose(e.target.value)}>{item}</button>
      )}
health{computerHealth}
      <table className='test'>
        <tbody>
          <tr>
          {battleField.map((item, index) =>
            <td key={index}>{item}</td>
          )}
          </tr>
        </tbody>
      </table>

      <table>
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
    
    result {winnerStatus} //// {computerStance}
    </>
  )
}