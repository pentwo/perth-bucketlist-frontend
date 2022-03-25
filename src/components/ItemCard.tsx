import { useSnackbar } from 'notistack'
import React from 'react'

import { ItemObj } from '../App'
import { tags } from '../utility/tags'

type CardProps = {
  item: ItemObj
  done: boolean
  addItemToList: (id: number) => void
}

const ItemCard = ({ addItemToList, item, done }: CardProps) => {
  // handle flip animate
  const onHandleFlip = (e: React.MouseEvent) => {
    e.currentTarget.childNodes.forEach(node => {
      const ele = node as HTMLDivElement
      ele.classList.toggle('opacity-0')
      ele.classList.toggle('opacity-100')
      ele.classList.toggle('faceup')
    })
  }

  return (
    <div className="w-8/12 place-self-center sm:place-self-auto sm:w-1/2 lg:w-1/3 xl:w-1/4  ">
      <PhotoCard
        onHandleFlip={onHandleFlip}
        done={done}
        item={item}
      ></PhotoCard>

      <div className="p-4">
        <label
          htmlFor={`list-${item.id}`}
          className="flex flex-row justify-between items-center cursor-pointer "
        >
          <h3 className="font-bold text-gray-700 hover:text-indigo-600">{item.name}</h3>
          <input
            id={`list-${item.id}`}
            type="checkbox"
            className="mr-4 hidden"
            checked={done}
            onChange={() => {
              addItemToList(item.id)
            }}
          />
          <div className="mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 fill-indigo-600 hover:scale-110 transition-all active:scale-95"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </label>
      </div>
    </div>
  )
}
export default ItemCard

type PhotoProps = {
  onHandleFlip: (e: React.MouseEvent) => void
  done: boolean
  item: ItemObj
}

const PhotoCard = ({ onHandleFlip, done, item }: PhotoProps) => {
  return (
    <div
      className="photo-card relative h-96 flex transition-all duration-200 active:bg-gray-100 m-2 cursor-pointer hover:-rotate-1"
      // hover:-rotate-1 hover:-z-10
      onClick={onHandleFlip}
    >
      {/* Front side */}
      <div className="absolute front faceup p-4 h-full opacity-100 transition-all duration-1000  border-2 border-gray-200">
        {/* Stamp */}
        <div
          className={`absolute inset-0 flex justify-center items-center transition-opacity duration-500 ${
            done ? 'opacity-100' : 'opacity-0'
          }`}
        >
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

        {/* Image */}
        <figure className="flex flex-col justify-center items-center text-gray-800 ">
          <img
            className="rounded-sm object-cover h-80 w-80"
            src={item.placeImg}
            alt={item.name}
          />
          <figcaption className="text-base font-handwriting p-1 -skew-x-6  rounded-sm -rotate-6 text-indigo-600 bg-slate-200 -translate-y-3">
            {item.location}
          </figcaption>
        </figure>

        {/* Tag emoji */}
        <div className="absolute bottom-4 right-4">
          <span>{tags[item.firstTag]}</span>
        </div>
      </div>

      {/* back side */}
      <div className="absolute back p-4 h-full opacity-0 transition-all duration-1000 border-2 border-gray-200 overflow-y-auto">
        <p className="text-500 text-sm">{`${item.description}`}</p>
      </div>
    </div>
  )
}
