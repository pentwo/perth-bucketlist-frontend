import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import topbar from 'topbar'
import { useSnackbar } from 'notistack'

import './App.css'
import Bucket from './components/Bucket'
import Filter from './components/Filter'
import Hero from './components/Hero'
import ListCards from './components/ListCards'
import usePrevious from './utility/usePrevious'

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
}

function App() {
  const [cards, setCards] = useState([initItem])
  const [filterCards, setFilterCards] = useState<ItemObj[]>([])
  const [filtered, setFiltered] = useState('all')

  const [myList, setMyList]: [number[], Function] = useState([])
  const [myListTitle, setMyListTitle] = useState('My List')
  const prevMyList: number[] = usePrevious(myList)

  const { enqueueSnackbar } = useSnackbar()

  let QUERY_LIMIT: string = process.env.REACT_APP_LIMIT as string
  let QUERY_MAX: string = process.env.REACT_APP_LIMIT_MAX as string

  // If URL contain Params = id
  let { id } = useParams<routerParams>()
  // Go to database to read the Saved List by ID
  useEffect(() => {
    topbar.show()
    
    if (id) {
      readSavedList(id)
    } 
  }, [])

  // Watch myList length to invoke Toast NOTIFICATION
  useEffect(()=>{
    if(myList.length===0 && prevMyList.length===0) return
    // only when manual adding/removing list item will show notification
    let difference = myList.length - prevMyList.length

    if(difference === 1) {
      // TOAST NOTIFICATION
      enqueueSnackbar('Added to the list!', {
        variant: 'success'
      })
    } 
    if(difference === -1) {
      // // TOAST NOTIFICATION
      enqueueSnackbar('Removed from the list!', {
        variant: 'warning'
      })
    }
    
    
  },[myList.length])

  // Add only one item
  function addItemToList(id: number) {
    setMyList((myList: number[]) => {
      if (!myList.includes(id)) {
        // added to myList
        return [...myList, id]
      } else {
        // remove item from myList
        return myList.filter(item => item !== id)
      }
    })
  }
  // Add list of items
  function addItemsToList(id: number[]) {
    setMyList((myList: number[]) => {
        // added to myList
        return [...myList, ...id]
    })
  }

  // Reading Saved List by ID
  async function readSavedList(id: string) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`)
      const data = await response.json()

      const { list, title } = data[0]
      
      setMyListTitle(title.replaceAll(`"`, `'`))

      addItemsToList(JSON.parse(list))
      // JSON.parse(list).forEach((item: number) => {
      //   addItemToList(item)
      // })

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
  async function getBucketItems(setLoading: Function, limit: string) {
    try {
      if(id) {
        limit = QUERY_MAX
      }

      const response = await fetch(`${API_ENDPOINT}?limit=${limit}`)
      const data = await response.json()
      const result = [...data]

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
    <div className="App overflow-hidden grid grid-cols-1 lg:grid-rows-[200px_1fr] lg:grid-cols-5 content-start">
      <header className="lg:col-start-2 lg:col-span-4">
        <Hero />
      </header>

      <aside className="grid lg:row-start-1 lg:row-span-2 lg:grid-cols-1 mb-4 lg:mb-0">
        <Bucket
          cards={cards}
          myListTitle={myListTitle}
          setMyListTitle={setMyListTitle}
          myList={myList}
          setMyListFunc={setMyList}
        />
      </aside>
      <main className="lg:col-start-2 lg:col-span-4 ">
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
