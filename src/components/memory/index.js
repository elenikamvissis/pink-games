import React, { useState } from 'react'
import './index.css'
import MemoryCard from './MemoryCard'
import StatusBar from './StatusBar'

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
        return {
          cards: flipCard(cards, [clickedCard.key]),
          firstCard: clickedCard,
          secondCard: undefined,
        }
      }
      // If firstCard is defined but secondCard isn't, keep the firstCard as it is, flip the clicked card
      // and set it as the secondCard.
      else if (firstCard && !secondCard) {
        return {
          cards: flipCard(cards, [clickedCard.key]),
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
  }

  return (
    <div className='game-container'>
      <StatusBar status='Time: 0 s' onRestart={onRestart}></StatusBar>
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
