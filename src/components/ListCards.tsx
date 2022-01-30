import React, { useEffect, useRef, useState } from 'react'

import ItemCard from './ItemCard'

let QUERY_LIMIT: string = process.env.REACT_APP_LIMIT as string
const API_ENDPOINT: string = process.env.REACT_APP_API_ENDPOINT as string

type Props = {}

export type ItemObj = {
  id: number
  name: string
  description: string
  placeImg: string
  location: string
  // done: boolean
  // imgUrl: string
}

const item: ItemObj = {
  id: 0,
  name: '',
  description: '',
  placeImg: '',
  location: ''
  // done: false,
  // imgUrl: 'https://picsum.photos/360/360'
}

function isBottom(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) {
    return false
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight
}
const ListCards = (props: Props) => {
  const [cards, setCards]: [Array<ItemObj>, Function] = useState([item])
  const [loading, setLoading] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  const hasMoreData = parseInt(QUERY_LIMIT) < 50

  async function getBucketItems() {
    const response = await fetch(`${API_ENDPOINT}?limit=${QUERY_LIMIT}`)
    const data = await response.json()
    const result = [...data]

    if (hasMoreData) {
      QUERY_LIMIT = (parseInt(QUERY_LIMIT) + 3).toString()
    }
    setLoading(false)
    setCards(result)
  }
  useEffect(() => {
    getBucketItems()
  })

  useEffect(() => {
    const onScroll = () => {
      if (isBottom(contentRef)) {
        getBucketItems()
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  })

  return (
    <div className="flex flex-col">
      <div
        className="container flex flex-wrap justify-center sm:justify-start mx-auto my-2 md:my-4"
        ref={contentRef}
      >
        {loading
          ? 'Loading...'
          : cards.map(i => {
              return <ItemCard item={i} key={i.id} />
            })}
      </div>
    </div>
  )
}
export default ListCards
