import React from 'react'
import './App.css'
import Hero from './components/Hero'
import List from './components/List'

// const END_POINT:string|URL = new URL(process.env.REACT_APP_API_ENDPOINT)

function App() {
  return (
    <div className="App">
      <header></header>
      <Hero />
      <main>
        <List />
      </main>
    </div>
  )
}

export default App
