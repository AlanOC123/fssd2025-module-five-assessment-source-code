import { Routes, Route } from 'react-router';
import { RegisterPage } from './pages';

function App() {
    return <div className='w-full h-full'>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>;
}

export default App;
