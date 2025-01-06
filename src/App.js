import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationTracker from './Tracking.jsx';
import BarcodeScanner from './BarcodeReader.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<MaximoDataFetcher />} /> */}
        <Route path="/" element={<BarcodeScanner />} />
        <Route path="/Barcode" element={<BarcodeScanner />} />


      </Routes>
    </Router>
  );
}

export default App;
