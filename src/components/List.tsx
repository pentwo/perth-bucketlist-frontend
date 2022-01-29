import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

// const END_POINT: string | URL = new URL(process.env.REACT_APP_API_ENDPOINT)

const QUERY_LIMIT: string = process.env.REACT_APP_LIMIT as string

type Props = {}

export type itemObj = {
  id: number
  name: string
  description: string
  // done: boolean
  // imgUrl: string
}

type apiResult = {}

const item: itemObj = {
  id: 0,
  name: '',
  description: ''
  // done: false,
  // imgUrl: 'https://picsum.photos/360/360'
}

const fetchItem = async (endPoint: RequestInfo) => {
  return await fetch(endPoint).then(res => res.json())
}

async function request<TResponse>(
  url: string | URL,
  config: RequestInit
): Promise<Array<Array<itemObj | any>>> {
  const response = await fetch(url.toString(), config)
  return await response.json()
}

const List = (props: Props) => {
  const [items, setItems]: [Array<itemObj>, Function] = useState([item])

  useEffect(() => {
    const url = new URL('http://localhost:4000/bucket')
    url.searchParams.append('limit', QUERY_LIMIT)
    // url.searchParams.append('offset', '0')
    request(url, {}).then(data => {
      if (typeof data === 'object' && data !== null) {
        const result: Array<itemObj> = [...data[0]]

        setItems(result)
      }
    })
  }, [])

  return (
    <div className="container flex flex-wrap justify-between mx-auto my-12 md:my-24">
      {items.map(i => {
        return <ListItem item={i} />
      })}
    </div>
  )
}
export default List
