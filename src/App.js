import './App.css';
import MaximoDataFetcher from './MaximoDataFetcher.js';
import BarcodeReader from './BarcodeReader.js';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

function App() {
  return (
   <Router>
    <Routes>
      {/* <Route path="/" element={<MaximoDataFetcher />} /> */}
      <Route path="/" element={<BarcodeReader />} />

    </Routes>
   </Router>
  );
}

export default App;
