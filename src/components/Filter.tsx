import React from 'react'
import { tags } from '../utility/tags'

type Props = {
  handleFilter: (e: React.MouseEvent) => void
  filtered: string
}

const Filter = ({ handleFilter, filtered }: Props) => {
  return (
    <div>
      <ul className="flex flex-wrap justify-center ">
        <li className="mr-4 mb-2 capitalize">
          <button
            id="all"
            className={`p-2 mb-2 capitalize font-handwriting rounded-md  transition-all duration-200 hover:text-slate-200 hover:bg-indigo-600  hover:shadow-md hover:-rotate-3 ${
              filtered === 'all'
                ? 'bg-indigo-600 text-slate-200 font-bold -rotate-3'
                : 'bg-slate-200 text-indigo-600'
            }`}
            onClick={handleFilter}
          >
            📝All
          </button>
        </li>
        {Object.keys(tags).map(key => {
          return (
            <li className="mr-4 mb-2 capitalize" key={key}>
              <button
                id={key}
                className={`p-2 mb-2 capitalize font-handwriting rounded-md  transition-all duration-200 hover:text-slate-200 hover:bg-indigo-600  hover:shadow-md hover:-rotate-3 ${
                  filtered === key
                    ? 'bg-indigo-600 text-slate-200 font-bold -rotate-3'
                    : 'bg-slate-200 text-indigo-600'
                }`}
                onClick={handleFilter}
              >
                {`${tags[key]} ${key}`}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Filter
