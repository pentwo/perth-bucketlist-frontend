import React, { useState } from 'react'

import { ItemObj } from './ListCards'

type Props = {
  item: ItemObj
}

const ItemCard = (props: Props) => {
  const [done, setDone]: [boolean, Function] = useState(false)

  return (
    <div className="sm:w-1/2 lg:w-1/3 ">
      <div
        className="photo-card relative h-96 flex transition-all duration-200 bg-white hover:bg-slate-100 active:bg-gray-100
        m-2"
        onClick={e => {
          // handle flip animate
          const ele = e.currentTarget as HTMLDivElement
          ele.childNodes.forEach(node => {
            const ele = node as HTMLDivElement
            if (ele.classList.contains('opacity-0')) {
              ele.classList.add('opacity-100')
              ele.classList.remove('opacity-0')
              ele.classList.toggle('faceup')
            } else if (ele.classList.contains('opacity-100')) {
              ele.classList.add('opacity-0')
              ele.classList.remove('opacity-100')
              ele.classList.toggle('faceup')
            }
          })
        }}
      >
        <div className="absolute front p-4 h-full opacity-100 transition-all duration-1000 faceup border-4 border-gray-200 ">
          <figure className="flex flex-col justify-center items-center text-gray-500">
            <img
              className="rounded-sm object-cover h-80 w-80"
              src={props.item.placeImg}
              alt="placeholder"
            />
            <figcaption>{props.item.location}</figcaption>
          </figure>
        </div>
        <div className="absolute back p-4 h-full opacity-0 transition-all duration-1000 border-4 border-gray-200 overflow-auto">
          <p className="text-500 text-sm">{`${props.item.description}`}</p>
          <button>Link</button>
        </div>
      </div>
      <div className=" p-4 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 text ">{props.item.name}</h3>
        <label htmlFor={`list-${props.item.id}`} className="  cursor-pointer">
          <input
            id={`list-${props.item.id}`}
            type="checkbox"
            className="mr-4 hidden"
            checked={done}
            onChange={() => setDone(!done)}
          />
          <div className="w-8 h-8 flex justify-center items-center mx-2">
            <svg
              className="drop-shadow hover:text-indigo-700"
              width="36"
              height="36"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12H12M15 12H12M12 12V9M12 12V15"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              className="hidden drop-shadow"
              width="36"
              height="36"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.87871 14.1213L12 12M14.1213 9.87868L12 12M12 12L9.87871 9.87868M12 12L14.1213 14.1213"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </label>
      </div>
    </div>
  )
}
export default ItemCard
