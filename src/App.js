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
  const [playerChoose, setPlayerChoose] = useState('')
  const [computerChoose, setComputerChoose] = useState(Math.floor(Math.random() * stance.length))
    let winner
    let playerStance = (stance[playerChoose])
    let computerStance = (stance[computerChoose])

  if (stance.indexOf(playerStance) === stance.indexOf(computerStance)) {
    winner = "draw"
  } else if (stance.indexOf(playerStance) === stance.indexOf(computerStance)-1 || 
            (stance.indexOf(playerStance) === stance.indexOf(computerStance)+2)) {
    winner = "player"
  } else if (stance.indexOf(playerStance) === stance.indexOf(computerStance)+1 || 
            (stance.indexOf(playerStance) === stance.indexOf(computerStance)-2)) {
    winner = "computer"
  }

  return (
    <>
    <h1>{language.title}</h1>

    <label>{language.moveLabel}</label>
      {stance.map((item, index) =>
        <button key={index} value={index} onClick={e => setPlayerChoose(e.target.value)}>{item}</button>
      )}

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
    
    result {winner}
    </>
  )
}