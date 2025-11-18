import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MainLayout } from './layouts/Main'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path='projects' element={<h1>Projects Page</h1>}></Route>
      </Route>
    </Routes>
  )
}

export default App
