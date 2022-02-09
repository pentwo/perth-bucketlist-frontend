import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'
import Bucket from './components/Bucket'
import Filter from './components/Filter'
import Hero from './components/Hero'
import ListCards from './components/ListCards'

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
  firstTag: string
  // imgUrl: string
}
type routerParams = {
  id: string
}

const initItem: ItemObj = {
  id: 0,
  name: '',
  description: '',
  placeImg: '',
  location: '',
  firstTag: ''
  // done: false,
  // imgUrl: 'https://picsum.photos/360/360'
}

function App() {
  const [cards, setCards] = useState([initItem])
  const [myList, setMyList]: [number[], Function] = useState([])
  const [filterCards, setFilterCards] = useState<ItemObj[]>([])
  const [filtered, setFiltered] = useState('')

  let QUERY_LIMIT: string = process.env.REACT_APP_LIMIT as string
  let OFFSET = 0

  let { id } = useParams<routerParams>()

  useEffect(() => {
    if (id) {
      readSavedList(id)
    } else {
    }
  }, [])

  function addItemToList(id: number) {
    setMyList((myList: number[]) => {
      if (!myList.includes(id)) {
        return [...myList, id]
      } else {
        return myList.filter(item => item !== id)
      }
    })
  }

  async function readSavedList(id: string) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`)
      const data = await response.json()
      // console.log('data: ', data)
      const { list } = data[0]

      JSON.parse(list).forEach((item: number) => {
        addItemToList(item)
      })
    } catch (error) {
      console.error(error)
    }
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

  async function getMoreBucketItems(setLoading: Function) {
    OFFSET += parseInt(QUERY_LIMIT, 10)
    const response = await fetch(
      `${API_ENDPOINT}?limit=${QUERY_LIMIT}&offset=${OFFSET}`
    )
    const data = await response.json()
    const result = [...data]

    if (parseInt(QUERY_LIMIT) < 50) {
      QUERY_LIMIT = (parseInt(QUERY_LIMIT) + 3).toString()
    }

    setLoading(false)
    if (cards.length > 0) {
      setCards(cards => {
        return [...cards, ...result]
      })
    }
  }

  const handleFilter = (e: React.MouseEvent) => {
    const tag: string = e.currentTarget?.id

    if (tag === '' || filtered === tag) {
      setFiltered('')
      setFilterCards([])
    } else {
      setFiltered(tag)

      const result = cards.filter(card => {
        return card.firstTag === tag
      })
      setFilterCards([...result])
    }
  }

  return (
    // <MyListCtx.Provider value={sampleCtx}>
    <div className="App grid grid-rows-[200px_1fr] grid-cols-5 content-start">
      <header className="col-start-2 col-span-4">
        <Hero />
      </header>
      <aside className="row-start-1 row-span-2 grid-cols-1">
        <Bucket cards={cards} myList={myList} setMyListFunc={setMyList} />
      </aside>
      <main className="col-start-2 col-span-4 ">
        <Filter handleFilter={handleFilter} filtered={filtered} />
        {filterCards.length > 0 || filtered ? (
          <ListCards
            myList={myList}
            getBucketItems={getBucketItems}
            cards={filterCards}
            addItemToList={addItemToList}
          />
        ) : (
          <ListCards
            myList={myList}
            getBucketItems={getBucketItems}
            cards={cards}
            addItemToList={addItemToList}
          />
        )}
      </main>
    </div>
    // </MyListCtx.Provider>
  )
}

export default App
