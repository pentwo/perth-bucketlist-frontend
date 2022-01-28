import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

// const END_POINT: string | URL = new URL(process.env.REACT_APP_API_ENDPOINT)

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
  name: 'This is the title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates officia totam rerum odit voluptatum amet laboriosam, sed ea veritatis facere voluptate voluptatem fugiat, corrupti nostrum fugit nisi? Quod, explicabo quam.'
  // done: false,
  // imgUrl: 'https://picsum.photos/360/360'
}

const fetchItem = async (endPoint: RequestInfo) => {
  return await fetch(endPoint).then(res => res.json())
}

async function request<TResponse>(
  url: string,
  config: RequestInit
): Promise<Array<Array<itemObj | any>>> {
  const response = await fetch(url, config)
  return await response.json()
}

const List = (props: Props) => {
  const [items, setItems]: [Array<itemObj>, Function] = useState([item])

  useEffect(() => {
    request('http://localhost:4000/bucket', {}).then(data => {
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
