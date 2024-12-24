import React, { useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const startScanning = async () => {
      try {
        await Quagga.init({
          inputStream: {
            name: 'live_stream',
            type: 'live_stream',
            target: videoRef.current,
            constraints: {
              width: 320,
              height: 240,
              facingMode: 'environment', // Use the back camera
            },
          },
          decoder: {
            readers: ['code_128', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'datamatrix_reader'],
            debug: false,
          },
          locate: true,
        });

        Quagga.onDetected((result) => {
          setScannedData(result.codeResult.code);
          Quagga.stop(); // Stop scanning after a successful scan
        });

        Quagga.start();
      } catch (error) {
        console.error('Error starting barcode scanner:', error);
        setScannedData('Error accessing camera.');
      }
    };

    startScanning();

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <video 
        ref={videoRef} 
        style={{ width: '500px' }} 
        autoPlay 
        playsInline 
      />
      {scannedData && <p>Scanned Data: {scannedData}</p>}
    </div>
  );
};

export default BarcodeScanner;