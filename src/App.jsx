/* import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MeetingHistory from './components/MeetingHistory'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/meeting-history" element={<MeetingHistory/>} />
      </Routes>
    </>
  )
}

export default App */

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MeetingHistory from './components/MeetingHistory';
import Welcome from './components/Welcome';
import './App.css';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center ">
            <div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Esta Semana
                </Link>
                <Link
                  to="/meeting-history"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Proximas Reuniones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/meeting-history" element={<MeetingHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

