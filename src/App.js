import React, { useState, useRef } from 'react';
import BarcodeReader from 'react-barcode-reader'; // Import BarcodeReader component

const BarcodeScanner = () => {
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);

  const handleScan = (data) => {
    setResult(data);
  };

  return (
    <div>
      <BarcodeReader
        onScan={handleScan} 
        // Optional props: 
        // - width: Set the width of the video element
        // - height: Set the height of the video element
        // - reader: Specify the barcode reader type (e.g., 'code128', 'ean13', 'upc') 
      />

      {result && (
        <div>
          <h3>Scanned Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;