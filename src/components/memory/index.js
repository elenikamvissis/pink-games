import React, { useState, useEffect } from 'react'

import MemoryCard from './MemoryCard'
import StatusBar from './StatusBar'

import './index.css'

import * as utils from '../../utils'

const colors = [
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
]

function generateCards() {
  const cards = []
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
    })
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
    })
  }
  cards.sort(() => Math.random() - 0.5)
  return cards
}

function flipCard(cards, keysToFlip) {
  return cards.map((oldCard) => {
    if (keysToFlip.includes(oldCard.key)) {
      return { ...oldCard, isFlipped: !oldCard.isFlipped }
    }
    return oldCard
  })
}

function Memory() {
  const [startTime, setStartTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [win, setWin] = useState(false)

  useEffect(() => {
    if (startTime !== 0 && !win) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [startTime, win])

  useEffect(() => {
    if (win) {
      utils
        .saveScore('memory', {
          name: name,
          timeMs: elapsedTime,
        })
        .then(() => console.log('Score saved.'))
        .then(() => utils.fetchLeaderboard('memory'))
        .then((leaderboard) => console.log(leaderboard))
    }
  }, [win])

  const [game, setGame] = useState({
    cards: generateCards(),
    firstCard: undefined,
    secondCard: undefined,
  })

  function onRestart() {
    setGame({
      cards: generateCards(),
      firstCard: undefined,
      secondCard: undefined,
    })
    setStartTime(0)
    setElapsedTime(0)
    setWin(false)
  }

  function onCardClick(clickedCard) {
    // If card is flipped, exit
    if (clickedCard.isFlipped) {
      return
    }

    setGame(({ cards, firstCard, secondCard }) => {
      // If both firstCard and secondCard from the previous state are undefined, we should
      // flip the clicked card and set it as the firstCard.
      if (!firstCard && !secondCard) {
        // We probably just need to check if firstCard exists
        // if no firstCard then we (probably) don't have a secondCard aswell.
        return {
          cards: flipCard(cards, [clickedCard.key]),
          firstCard: clickedCard,
          secondCard: undefined,
        }
      }
      // If firstCard is defined but secondCard isn't, keep the firstCard as it is, flip the clicked card
      // and set it as the secondCard.
      else if (firstCard && !secondCard) {
        let newCards = flipCard(cards, [clickedCard.key])

        if (newCards.every((card) => card.isFlipped)) {
          setWin(true)
        }

        return {
          cards: newCards,
          firstCard: firstCard,
          secondCard: clickedCard,
        }
      }
      // If the previous two clicked cards have same color, we should flip the clicked card,
      // set that one as the new firstCard and then remove secondCard from the state.
      else if (firstCard.color === secondCard.color) {
        return {
          cards: flipCard(cards, [clickedCard.key]),
          firstCard: clickedCard,
          secondCard: undefined,
        }
      }
      // 4. Else, if the previous two clicked cards have different colors =>
      // we should flip the clicked card and flip back firstCard and secondCard,
      // we should also set the new firstCard and remove secondCard from the state
      else if (firstCard.color !== secondCard.color) {
        return {
          cards: flipCard(cards, [
            firstCard.key,
            secondCard.key,
            clickedCard.key,
          ]),
          firstCard: clickedCard,
          secondCard: undefined,
        }
      }
    })

    setStartTime((oldStartTime) =>
      oldStartTime === 0 ? Date.now() : oldStartTime
    )
  }

  return (
    <div className='game-container'>
      <StatusBar
        status={'Time: ' + Math.floor(elapsedTime / 1000) + ' s'}
        onRestart={onRestart}
      ></StatusBar>
      <div className='memory-grid'>
        {game.cards.map((card) => (
          <MemoryCard
            key={card.key}
            color={card.color}
            isFlipped={card.isFlipped}
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </div>
  )
}

export default Memory
