import React, { useState } from 'react'
import MyListInterface from '../App'
import { ItemObj } from '../App'

type Props = {
  myList: number[]
  cards: Array<ItemObj>
  setMyListFunc: Function
}

export default function Bucket({ myList, cards }: Props) {
  const [title, setTitle] = useState('My List')

  return (
    <div className="sticky top-4 m-4 mb-0 p-2 border-2 shadow-lg h-[calc(100vh-32px)] shadow-blue-100 flex flex-col">
      {/* Title */}
      <div className="list-title text-xl mb-4">
        <input
          className="w-full mb-2"
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.currentTarget.value)
          }}
        />
      </div>

      {/* Bucket list */}
      <ul className="mb-16 overflow-y-auto">
        {myList.length === 0 ? (
          <p>Add item to start...</p>
        ) : (
          myList.map((id: number) => {
            return (
              <li
                className="underline underline-offset-4 mb-4"
                key={`myList-${id}`}
              >
                {cards[id - 1].name}
              </li>
            )
          })
        )}
      </ul>

      {/* buttons */}
      <div className="absolute bottom-4 flex">
        <button className="flex items-center mr-2 p-2 rounded-md transition-colors hover:text-slate-200 hover:bg-indigo-600 bg-slate-200 text-indigo-600 hover:shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save
        </button>
        <button className="flex items-center p-2 rounded-md transition-colors hover:text-slate-200 hover:bg-indigo-600 bg-slate-200 text-indigo-600 hover:shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>
      </div>
    </div>
  )
}
