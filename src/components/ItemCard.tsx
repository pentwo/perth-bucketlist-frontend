import React, { useState } from 'react'

import { ItemObj } from '../App'

type Props = {
  item: ItemObj
  addItemToList: (id: number) => void
}

const ItemCard = ({ addItemToList, item }: Props) => {
  const [done, setDone]: [boolean, Function] = useState(false)
  const [faceUp, setFaceUp] = useState(true)

  const onHandleFlip = (e: React.MouseEvent) => {
    // handle flip animate
    e.currentTarget.childNodes.forEach(node => {
      const ele = node as HTMLDivElement
      ele.classList.toggle('opacity-0')
      ele.classList.toggle('opacity-100')
      ele.classList.toggle('faceup')
    })
  }

  return (
    <div className="sm:w-1/2 lg:w-1/3 ">
      {/* {console.log('re-render:', item.name)} */}
      <div
        className={`photo-card relative h-96 flex transition-all duration-200 active:bg-gray-100 m-2 cursor-pointer ${
          done ? 'bg-pink-200' : ''
        }}`}
        onClick={onHandleFlip}
      >
        <div
          className={`absolute front faceup p-4 h-full opacity-100 transition-all duration-1000  border-2 border-gray-200`}
        >
          {done ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32 fill-indigo-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            ''
          )}
          <figure className="flex flex-col justify-center items-center text-gray-800 ">
            <img
              className="rounded-sm object-cover h-80 w-80"
              src={item.placeImg}
              alt={item.name}
            />
            <figcaption className="text-base font-handwriting p-1 -skew-x-6 -rotate-6 bg-indigo-200 -translate-y-3">
              {item.location}
            </figcaption>
          </figure>
        </div>
        <div
          className={`absolute back p-4 h-full opacity-0 transition-all duration-1000 border-2 border-gray-200 overflow-y-auto`}
        >
          <p className="text-500 text-sm">{`${item.description}`}</p>
        </div>
      </div>
      <div className=" p-4">
        <label
          htmlFor={`list-${item.id}`}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <h3 className="font-bold text-gray-700 text ">{item.name}</h3>
          <input
            id={`list-${item.id}`}
            type="checkbox"
            className="mr-4 hidden"
            checked={done}
            onChange={() => {
              setDone(!done)
              addItemToList(item.id)
            }}
          />
          <div className="w-8 h-8 flex justify-center items-center mx-2">
            <svg
              className="drop-shadow hover:text-indigo-700"
              width="36"
              height="36"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12H12M15 12H12M12 12V9M12 12V15"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="hidden drop-shadow"
              width="36"
              height="36"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.87871 14.1213L12 12M14.1213 9.87868L12 12M12 12L9.87871 9.87868M12 12L14.1213 14.1213"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </label>
      </div>
    </div>
  )
}
export default ItemCard
