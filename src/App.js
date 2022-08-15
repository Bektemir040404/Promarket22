import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage.js';
import Navbarr from './Pages/Navbarr.js'
import BasketPage from './Pages/BasketPage.js'
import { useState, createContext, useEffect } from 'react'
export const MyContext = createContext({})


function App() {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('product')) || [])
  const [search, setSearch] = useState('')
  const [market, setMarket] = useState('')

  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(count))
  }, [count])

  return (
    <>
      <MyContext.Provider value={{ count, setCount, search, setSearch, market, setMarket }}>
        <BrowserRouter>
          <Navbarr />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/basket' element={<BasketPage />} />
          </Routes>
        </BrowserRouter>

      </MyContext.Provider>
    </>
  )
}

export default App