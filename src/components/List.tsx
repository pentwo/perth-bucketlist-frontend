import React from 'react'
import ListItem from './ListItem'
type Props = {}

type itemObj = {
  title: string
  description: string
  done: boolean
}

const item = {
  title: 'This is the title',
  description: 'this is description',
  done: false
}

const List = (props: Props) => {
  return (
    <div className="container mx-auto my-12 md:my-24">
      <ListItem item={item}></ListItem>
    </div>
  )
}
export default List
