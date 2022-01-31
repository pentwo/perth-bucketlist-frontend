import { useState, createContext } from 'react'
import './App.css'
import Bucket from './components/Bucket'
import Hero from './components/Hero'
import ListCards from './components/ListCards'

let QUERY_LIMIT: string = process.env.REACT_APP_LIMIT as string
const API_ENDPOINT: string = process.env.REACT_APP_API_ENDPOINT as string

export interface MyListInterface {
  myList: number[]
  setMyList: Function
}
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

function App() {
  const [cards, setCards] = useState([item])
  const [myList, setMyList]: [number[], Function] = useState([])
  const hasMoreData = parseInt(QUERY_LIMIT) < 50

  function addItemToList(id: number) {
    setMyList((myList: number[]) => {
      if (!myList.includes(id)) {
        return [...myList, id]
      } else {
        return myList.filter(item => item !== id)
      }
    })
  }

  async function getBucketItems(setLoading: Function) {
    const response = await fetch(`${API_ENDPOINT}?limit=${QUERY_LIMIT}`)
    const data = await response.json()
    const result = [...data]

    if (parseInt(QUERY_LIMIT) < 50) {
      QUERY_LIMIT = (parseInt(QUERY_LIMIT) + 3).toString()
    }
    setLoading(false)
    setCards(result)
  }

  return (
    // <MyListCtx.Provider value={sampleCtx}>
    <div className="App grid grid-row-2 grid-cols-5">
      <header className="col-start-2 col-span-4">
        <Hero />
      </header>
      <aside className="row-start-1 row-span-2 grid-cols-1">
        <Bucket cards={cards} myListState={myList} setMyListFunc={setMyList} />
      </aside>
      <main className="col-start-2 col-span-4">
        <ListCards
          getBucketItems={getBucketItems}
          cards={cards}
          addItemToList={addItemToList}
        />
      </main>
    </div>
    // </MyListCtx.Provider>
  )
}

export default App
