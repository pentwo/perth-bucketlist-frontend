import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import topbar from 'topbar'
import { useSnackbar } from 'notistack'

import { ItemObj } from '../App'

const API_ENDPOINT: string = process.env.REACT_APP_API_ENDPOINT as string

type Props = {
  cards: Array<ItemObj>
  myListTitle: string
  setMyListTitle: Function
  myList: number[]
  setMyListFunc: Function
}
type Payload = {
  id: string
  title: string
  list: number[]
}
topbar.config({
  barThickness: 5
})

export default function Bucket({
  myListTitle,
  setMyListTitle,
  myList,
  cards
}: Props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  let navigate = useNavigate()
  const listEl = useRef<HTMLDivElement>(null)

  async function saveBucketList() {
    const id = nanoid(6)
    topbar.show()

    let payload: Payload = {
      id,
      title: myListTitle.replaceAll(`'`, `"`),
      list: myList
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      })
      const data = await response.json()
      navigate(`/${data.id}`)
      topbar.hide()

      // TOAST NOTIFICATION
      enqueueSnackbar('List Saved!', {
        variant: 'success'
      })
    } catch (error) {
      console.error(error)
      topbar.hide()

      // TOAST NOTIFICATION
      enqueueSnackbar('Something Went Wrong!', {
        variant: 'error'
      })
    }
  }

  function toggleHiddenListEl() {
    if (listEl.current) {
      listEl.current.classList.toggle('hidden')
    }
  }

  function copyToClipboard() {
    let bucketListText = ''

    myList.map(
      id =>
        (bucketListText += `- ${cards[id - 1].name}
    `)
    )

    let text = `Here is my bucket list in Perth

    ${bucketListText}

    Create your own bucket list at ${window.location.href}
    `

    try {
      navigator.clipboard.writeText(text)

      // TOAST NOTIFICATION
      enqueueSnackbar('List Copied to Clipboard!', {
        variant: 'success'
      })
    } catch (error) {
      // TOAST NOTIFICATION
      enqueueSnackbar('Something Went Wrong!', {
        variant: 'error'
      })
    }
  }

  return (
    <>
      <button
        className="place-self-center flex lg:hidden mr-2 p-2 rounded-md transition-colors hover:text-slate-200 hover:bg-indigo-600 bg-slate-200 text-indigo-600 hover:shadow-md"
        onClick={toggleHiddenListEl}
      >
        📝 Show List
      </button>
      <div
        className="hidden sticky lg:flex flex-col top-4 m-4 mb-0 p-2 border-2 shadow-lg lg:h-[calc(100vh-32px)] shadow-blue-100"
        ref={listEl}
      >
        {/* Title */}
        <div className="list-title text-xl mb-4">
          <input
            className="w-full mb-2"
            type="text"
            value={myListTitle}
            onChange={e => {
              setMyListTitle(e.currentTarget.value)
            }}
          />
        </div>
        {/* Bucket list */}
        <ul className="mb-28 overflow-y-auto">
          {myList.length > 0 && cards.length > 1 ? (
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
          ) : (
            <p>Add item to start...</p>
          )}
        </ul>
        {/* buttons */}
        <div className="absolute bottom-4 flex flex-row sm:flex-col">
          <button
            className="flex items-center mb-0 mr-2 sm:mb-2 sm:mr-0 p-2 rounded-md transition-colors hover:text-slate-200 hover:bg-indigo-600 bg-slate-200 text-indigo-600 hover:shadow-md active:scale-95 disabled:text-slate-400 disabled:bg-slate-200 disabled:hover:shadow-none"
            onClick={saveBucketList}
            disabled={myList.length === 0}
          >
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
          <button
            className="flex items-center p-2 rounded-md transition-colors hover:text-slate-200 hover:bg-indigo-600 bg-slate-200 text-indigo-600 hover:shadow-md active:scale-95 disabled:text-slate-400 disabled:bg-slate-200 disabled:hover:shadow-none"
            disabled={myList.length === 0}
            onClick={copyToClipboard}
          >
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
            Copy List
          </button>
        </div>
      </div>
    </>
  )
}
