import React from 'react'
import './App.css'
import Bucket from './components/Bucket'
import Hero from './components/Hero'
import ListCards from './components/ListCards'

function App() {
  return (
    <div className="App grid grid-row-2 grid-cols-5">
      <header className="col-start-2 col-span-4">
        <Hero />
      </header>
      <aside className="row-start-1 row-span-2 grid-cols-1">
        <Bucket />
      </aside>
      <main className="col-start-2 col-span-4">
        <ListCards />
      </main>
    </div>
  )
}

export default App
