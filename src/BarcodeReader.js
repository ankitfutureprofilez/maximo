import React, { useState, useRef } from 'react';
import { useBarcode } from 'react-barcode-reader';

const BarcodeReader = () => {
  const [text, setText] = useState('');
  const ref = useRef(null);

  const { results } = useBarcode({
    onError: (err) => {
      console.error(err);
    },
  });

  const handleScan = () => {
    if (ref.current) {
      ref.current.scan();
    }
  };

  return (
    <div>
      <video ref={ref} style={{ width: '320px', height: '240px' }} />
      <button onClick={handleScan}>Scan Barcode</button>
      <p>Scanned Barcode: {text}</p>
    </div>
  );
};

export default BarcodeReader;