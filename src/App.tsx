import { Route, Routes } from "react-router-dom"
import './styling.css'
import Home from "./Home"
import Table from "./Table"
import Header from "./Header"



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/table' element={<Table />} />
      </Routes>
    </>
  )
}

export default App

