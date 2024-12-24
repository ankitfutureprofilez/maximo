import React from 'react';
import QrReader from 'react-qr-reader';

const QrScanner = () => {
  const handleScan = (data) => {
    if (data) {
      console.log("QR Code Data:", data);
    }
  };

  const handleError = (err) => {
    console.error("Error scanning QR Code:", err);
  };

  return (
    <QrReader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{ width: '100%' }}
    />
  );
};

export default QrScanner;
