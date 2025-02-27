import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from './components/home'
import AddBook from './components/addBook'
import Book from './components/book'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books />}/>
        <Route path="/books/:id" element={<Book />}/>
        <Route path="/add-book" element={<AddBook />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
