import React from 'react'

type itemObj = {
  title: string
  description: string
  done: boolean
}
type Props = {
  item: itemObj
}

const ListItem = (props: Props) => {
  return (
    // <div>
    //   <h3>{props.title}</h3>
    //   <p>A hoverable card.</p>
    // </div>
    <label
      htmlFor="input1"
      className="p-4 flex justify-between items-center shadow rounded cursor-pointer border border-transparent hover:border-blue-500 active:bg-gray-50 bg-white mb-3 sm:mb-7"
    >
      <div className="flex items-center">
        <input id="input1" type="checkbox" className="mr-4" />
        <div className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        </div>
        <p className="select-none">
          {props.item.title}{' '}
          <span className="text-grey text-xs">{props.item.description}</span>
        </p>
      </div>
      <button className="text-gray-500 hover:text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
    </label>
  )
}
export default ListItem
