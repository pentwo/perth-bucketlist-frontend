import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

// const END_POINT: string | URL = new URL(process.env.REACT_APP_API_ENDPOINT)

const QUERY_LIMIT: string = process.env.REACT_APP_LIMIT as string

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

async function getBucketItems<Array>(
  url: string | URL,
  config: RequestInit
): Promise<Array> {
  const response = await fetch(url.toString(), config)
  return await response.json()
}

const ListCards = (props: Props) => {
  const [Cards, setCards]: [Array<ItemObj>, Function] = useState([item])

  useEffect(() => {
    const url = new URL('http://localhost:4000/bucket')
    url.searchParams.append('limit', QUERY_LIMIT)
    // url.searchParams.append('offset', '0')
    getBucketItems<Array<ItemObj>>(url, {}).then(data => {
      // if (typeof data === 'array' && data !== null) {
      const result: Array<ItemObj> = [...data]

      setCards(result)
      // }
    })
  }, [])

  return (
    <div className="flex flex-col">
      <div className="container flex flex-wrap justify-between mx-auto my-2 md:my-4">
        {Cards.map(i => {
          return <ItemCard item={i} />
        })}
      </div>
    </div>
  )
}
export default ListCards
