import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import topbar from 'topbar'
import { useSnackbar } from 'notistack'

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
  const [filterCards, setFilterCards] = useState<ItemObj[]>([])
  const [filtered, setFiltered] = useState('all')

  const [myList, setMyList]: [number[], Function] = useState([])
  const [myListTitle, setMyListTitle] = useState('My List')

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  let QUERY_LIMIT: string = process.env.REACT_APP_LIMIT as string
  let OFFSET = 0

  // If URL contain Params = id
  let { id } = useParams<routerParams>()
  // Go to database to read the Saved List by ID
  useEffect(() => {
    topbar.show()
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

  // Reading Saved List by ID
  async function readSavedList(id: string) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`)
      const data = await response.json()

      const { list, title } = data[0]

      setMyListTitle(title.replaceAll(`"`, `'`))
      JSON.parse(list).forEach((item: number) => {
        addItemToList(item)
      })

      // TOAST NOTIFICATION
      enqueueSnackbar('List Loaded!', {
        variant: 'success'
      })
    } catch (error) {
      console.error(error)

      // TOAST NOTIFICATION
      enqueueSnackbar('Something Went Wrong!', {
        variant: 'error'
      })
    }
    topbar.hide()
  }
  // Get all the Bucket list items
  async function getBucketItems(setLoading: Function) {
    try {
      const response = await fetch(`${API_ENDPOINT}?limit=${QUERY_LIMIT}`)
      const data = await response.json()
      const result = [...data]

      if (parseInt(QUERY_LIMIT) < 50) {
        QUERY_LIMIT = (parseInt(QUERY_LIMIT) + 3).toString()
      }

      setLoading(false)
      setCards(result)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Something Went Wrong!', {
        variant: 'error'
      })
    }

    topbar.hide()
  }

  const handleFilter = (e: React.MouseEvent) => {
    const tag: string = e.currentTarget?.id

    if (tag === 'all') {
      setFiltered('all')
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
        <Bucket
          cards={cards}
          myListTitle={myListTitle}
          setMyListTitle={setMyListTitle}
          myList={myList}
          setMyListFunc={setMyList}
        />
      </aside>
      <main className="col-start-2 col-span-4 ">
        <Filter handleFilter={handleFilter} filtered={filtered} />

        {/* IF filter tag pressed, show tag cards only */}
        {filterCards.length > 0 ? (
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
