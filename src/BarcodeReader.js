import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const BarcodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [scanning, setScanning] = useState(true); // New state to manage scanning status
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        videoRef.current.srcObject = stream;
        videoRef.current.play();

        codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, error) => {
            if (result) {
              setScannedData(result.text);
              console.log('Scanned Barcode Data:', result.text);
              setScanning(false); // Stop scanning after a successful scan
            } else if (error && !error.message.includes('No MultiFormatReader available')) {
              console.error('Barcode scanning error:', error);
            }
          }
        );
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    if (scanning) {
      startScanning();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [scanning]);

  const handleRetry = () => {
    setScannedData(null);
    setCameraError(null);
    setScanning(true);
  };

  return (
    <div className="scanner-container">
      <h1>Barcode Scanner</h1>
      {cameraError && <p className="error-message">{cameraError}</p>}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
      />
      {scannedData && <p className="scanned-data">Scanned Data: {scannedData}</p>}
      {!scannedData && (
        <button onClick={handleRetry}>Scan Again</button>
      )}
    </div>
  );
};

export default BarcodeScanner;
