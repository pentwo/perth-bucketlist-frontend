import React, { useState } from 'react'

import { itemObj } from './List'

type Props = {
  item: itemObj
}

const ListItem = (props: Props) => {
  const [done, setDone]: [boolean, Function] = useState(false)

  return (
    <div className=" border border-gray-200 rounded-xl bg-white w-1/4 hover:bg-gray-50 active:bg-gray-100 m-2">
      <div className="flex justify-center items-center text-gray-500">
        <img
          className="rounded-t-xl"
          src="https://picsum.photos/360/360"
          alt="placeholder"
        />
      </div>
      <div className="p-4 text-center mt-4">
        <label
          htmlFor="input1"
          className=" flex justify-center items-center cursor-pointer"
        >
          <div className="flex items-center">
            <input
              id="input1"
              type="checkbox"
              className="mr-4"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <p className="font-bold text-gray-700 text select-none">
              {props.item.name}
            </p>
          </div>
        </label>
        <p className="text-500 text-sm mt-4">{props.item.description}</p>
      </div>
    </div>
  )
}
export default ListItem
