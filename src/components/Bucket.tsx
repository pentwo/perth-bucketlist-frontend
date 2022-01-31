import React, { useContext, useState } from 'react'
import MyListInterface from '../App'
import { ItemObj } from '../App'

type Props = {
  myListState: number[]
  cards: Array<ItemObj>
  setMyListFunc: Function
}

export default function Bucket({ myListState, cards }: Props) {
  const [title, setTitle] = useState('My List')

  return (
    <div className="sticky top-4 m-4 mb-0 p-2 border-2 shadow-lg h-[calc(100vh-32px)] shadow-blue-100">
      <div className="list-title overflow-y-auto">
        <input
          className="w-full mb-2"
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.currentTarget.value)
          }}
        />
      </div>
      <ul>
        {myListState.length === 0 ? (
          <p>Add item to start...</p>
        ) : (
          myListState.map((id: number) => {
            return <li key={`bucket-${id}`}>{cards[id - 1].name}</li>
          })
        )}
      </ul>
    </div>
  )
}
