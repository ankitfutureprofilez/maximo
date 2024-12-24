import React from 'react';
import { QrReader } from 'react-qr-reader';

const App = () => {
  const handleScan = (result) => {
    if (result) {
      console.log("QR Code Data:", result.text);
    }
  };

  const handleError = (error) => {
    console.error("Error scanning QR Code:", error);
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrReader
        onResult={(result, error) => {
          if (result) handleScan(result);
          if (error) handleError(error);
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default App;
