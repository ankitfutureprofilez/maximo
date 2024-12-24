import React, { useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const BarcodeReader = () => {
  const [result, setResult] = useState('');

  const handleScan = async () => {
    const codeReader = new BrowserMultiFormatReader();

    try {
      const devices = await codeReader.listVideoInputDevices();
      if (devices.length > 0) {
        codeReader.decodeFromInputVideoDevice(devices[0].deviceId, 'video', (result, err) => {
          if (result) {
            setResult(result.text);
          }
          if (err) {
            console.error(err);
          }
        });
      }
    } catch (err) {
      console.error('Error listing video input devices:', err);
    }
  };

  return (
    <div>
      <h1>Barcode Reader</h1>
      <button onClick={handleScan}>Start Scanning</button>
      <video id="video" width="300" height="200" style={{ border: '1px solid black' }}></video>
      {result && <p>Scanned Result: {result}</p>}
    </div>
  );
};

export default BarcodeReader;
