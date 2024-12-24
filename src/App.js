import logo from './logo.svg';
import './App.css';
import MaximoDataFetcher from './BarcodeReader';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<MaximoDataFetcher />} />
    </Routes>
   </Router>
  );
}

export default App;
