import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../src/pages/Login'
import Registration from '../src/pages/Registration'

// pages and components
//import Home from './pages/Home'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
