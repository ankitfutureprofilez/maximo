import './App.css';
import MaximoDataFetcher from './MaximoDataFetcher.js';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import LocationTracker from './Tracking.jsx';

function App() {
  return (
   <Router>
    <Routes>
      {/* <Route path="/" element={<MaximoDataFetcher />} /> */}
      <Route path="/" element={<LocationTracker />} />

    </Routes>
   </Router>
  );
}

export default App;
