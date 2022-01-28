import React from 'react'
import './App.css'
import Hero from './components/Hero'
import List from './components/List'

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
